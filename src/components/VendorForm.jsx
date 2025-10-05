import React, { useState } from "react";

const VendorForm = () => {
  // ✅ ONLY include fields that exist in your Google Sheet
  const [formData, setFormData] = useState({
    "Email address": "",
    "Business/Place Name": "",
    Category: "",
    "Area / Neighborhood": "",
    "Short Description": "",
    "Full Address": "",
    "Phone Number": "",
    "Website/social media Link": "",
  });

  const categories = [
    "Food & Dining",
    "Accommodation",
    "Shopping",
    "Services",
    "Events",
    "Entertainment",
  ];

  const areas = [
    "Bodija",
    "UI Area",
    "Agodi",
    "Dugbe",
    "Sango",
    "Mokola",
    "Eleyele",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ YOUR WEB APP URL (NO SPACES!)
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbztYxc53seJ2mNXzrmQiJwGQA0RyhmQSOL1UtcSK86EpVZMolBNHOFmA31d68JxHYSd/exec";

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("✅ Business submitted! Ajani will review shortly.");
        setFormData({
          "Email address": "",
          "Business/Place Name": "",
          Category: "",
          "Area / Neighborhood": "",
          "Short Description": "",
          "Full Address": "",
          "Phone Number": "",
          "Website/social media Link": "",
        });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "❌ Submission failed. Please try again or chat with Ajani for help."
      );
    }
  };

  return (
    <section id="vendors" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            For Business Owners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ajani will learn about your business and recommend you to customers
            automatically. List your business to reach thousands of potential
            customers in Ibadan.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="Email address"
                value={formData["Email address"]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business/Place Name
              </label>
              <input
                type="text"
                name="Business/Place Name"
                value={formData["Business/Place Name"]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Category & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="Category"
                  value={formData["Category"]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area / Neighborhood
                </label>
                <select
                  name="Area / Neighborhood"
                  value={formData["Area / Neighborhood"]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="Short Description"
                value={formData["Short Description"]}
                onChange={handleChange}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Authentic amala with assorted meats..."
                required
              />
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="Full Address"
                value={formData["Full Address"]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Opposite UI Gate, Bodija"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (WhatsApp preferred)
              </label>
              <input
                type="tel"
                name="Phone Number"
                value={formData["Phone Number"]}
                onChange={handleChange}
                placeholder="+2348012345678"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Website/Social Media */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website / Social Media Link (Optional)
              </label>
              <input
                type="url"
                name="Website/social media Link"
                value={formData["Website/social media Link"]}
                onChange={handleChange}
                placeholder="https://instagram.com/yourbusiness"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow"
              >
                Submit to Ajani
              </button>
              <a
                href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋%20I%20need%20help%20with%20my%20business%20listing!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow"
              >
                <i className="fab fa-whatsapp"></i> Chat for Help
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VendorForm;
