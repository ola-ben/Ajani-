import React, { useState } from "react";

const VendorForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    area: "",
    startingPrice: "",
    whatsapp: "",
    address: "",
    shortDescription: "",
    itemPrices: [{ itemName: "", price: "" }], // Start with one item
    businessImage: null,
  });

  const categories = [
    "Food & Dining",
    "Accommodation",
    "Shopping",
    "Services",
    "Events",
    "Entertainment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Only PNG, JPG, JPEG files are allowed.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, businessImage: file }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, businessImage: null }));
  };

  // ✅ Define addItem function
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      itemPrices: [...prev.itemPrices, { itemName: "", price: "" }],
    }));
  };

  const handleRemoveItemPrice = (index) => {
    setFormData((prev) => {
      const newItems = [...prev.itemPrices];
      newItems.splice(index, 1);
      return { ...prev, itemPrices: newItems };
    });
  };

  const handleItemPriceChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.itemPrices];
      newItems[index][field] = value;
      return { ...prev, itemPrices: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state (optional)
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxKgc-mo5mWjrXQgY8_sEHDRDtHASPSdSq0wvu8_8dgcTX6DRvIzb_EAaq7mCcbki1r/exec",
        {
          method: "POST",
          mode: "no-cors", // Required for Google Apps Script
          headers: {
            "Content-Type": "text/plain", // Must be text/plain for no-cors
          },
          body: JSON.stringify(formData),
        }
      );

      // Because of no-cors, we can't read response, but if no error → assume success
      alert(
        "✅ Form submitted! We’ll review and add you to our catalog within 24 hours."
      );
      setFormData({
        businessName: "",
        category: "",
        area: "",
        startingPrice: "",
        whatsapp: "",
        address: "",
        shortDescription: "",
        itemPrices: [{ itemName: "", price: "" }],
        businessImage: null,
      });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("❌ Failed to submit. Please try again or contact us on WhatsApp.");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  };

  return (
    <section id="vendors" className="py-16 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            List your business on Ajani
          </h2>
          <p className="text-gray-300">
            Reach thousands of potential customers in Ibadan
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-6">
            Fill this form — we’ll review and add you to our catalog within 24
            hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Business/Place Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g., Amala Skye"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area, Starting Price, WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Area / Neighborhood
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., Bodija"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Starting Price
                </label>
                <input
                  type="number"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  placeholder="1500"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+23480..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, area, Ibadan"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="What makes your business great?"
                rows={3}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Business Image */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                UploadPhoto
              </label>
              <div
                className={`border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition ${
                  formData.businessImage ? "bg-gray-700" : ""
                }`}
                onClick={() =>
                  document.getElementById("businessImageInput").click()
                }
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                  id="businessImageInput"
                />

                {formData.businessImage ? (
                  <div className="relative w-full h-32 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(formData.businessImage)}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs"
                    >
                      ×
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("businessImageInput").click();
                      }}
                      className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>

            {/* ✅ FIXED: Item Prices - Responsive Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Item Prices (e.g., Amala 1200, Ewedu 500, Rice 4000)
              </label>
              <div className="space-y-3">
                {formData.itemPrices.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center"
                  >
                    <input
                      type="text"
                      placeholder="Item name"
                      value={item.itemName}
                      onChange={(e) =>
                        handleItemPriceChange(index, "itemName", e.target.value)
                      }
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                    />
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        placeholder="Price (₦)"
                        value={item.price}
                        onChange={(e) =>
                          handleItemPriceChange(index, "price", e.target.value)
                        }
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItemPrice(index)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center w-10"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                  >
                    ➕ Add another item
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                <i className="fab fa-telegram-plane"></i> Submit Listing
              </button>
              <p className="mt-2 text-xs text-gray-400">
                We review all listings. By submitting, you agree your info can
                be shown publicly on Ajani.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VendorForm;
