import React from "react";

const FeaturedBanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 font-rubik">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded mb-2">
            Featured
          </span>
          <h3 className="text-xl font-bold">Weekend Special Offers</h3>
          <p className="text-slate-700">
            Exclusive deals available only through Ajani's recommendations
          </p>
        </div>
        <a
          href="https://wa.me/2348123456789?text=Tell me about weekend offers"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <i className="fas fa-comment"></i> Ask Ajani
        </a>
      </div>
    </section>
  );
};

export default FeaturedBanner;
