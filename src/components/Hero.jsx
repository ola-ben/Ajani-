import React from "react";

const Hero = () => {
  return (
    <section
      id="hero" // ✅ Fixed: removed trailing space
      className="max-w-4xl mx-auto px-5 py-20 text-center"
    >
      <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <a
          href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/public/logos/logo8.png"
            alt="Ajani - Your Ibadan Guide"
            className="w-full h-full object-contain"
          />
        </a>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
        Hi, I'm Ajani — Your Ibadan Guide
      </h1>

      <p className=":lg:text-lg text-[15px] md:text-xl text-slate-600 mb-8 font-rubik">
        Ask me anything: Where's the cheapest amala in Bodija? Best hotels under
        ₦10,000? Weekend events happening now?
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋" // ✅ Fixed: removed extra spaces
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition shadow hover:shadow-md hover:-translate-y-0.5"
        >
          <i className="fab fa-whatsapp"></i> Chat on WhatsApp
        </a>

        {/* Browse Directory Button */}
        <a
          href="#directory" // ✅ Changed to #directory (matches your nav)
          className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-4 rounded-lg font-semibold text-lg transition"
        >
          <i className="fas fa-search"></i> Browse Directory
        </a>
      </div>
    </section>
  );
};

export default Hero;
