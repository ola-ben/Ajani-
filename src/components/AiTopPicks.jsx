import React from "react";

const AiTopPicks = () => {
  const cards = [
    {
      icon: "utensils",
      title: "Best Amala in Bodija",
      desc: "Amala Skye continues to be the top choice with authentic flavors and fair pricing.",
      tags: ["Amala: ₦1,200", "Ewedu: ₦500", "Assorted: ₦1,500"],
      link: "Amala Skye",
      verified: "Verified today by Ajani's team",
    },
    {
      icon: "bed",
      title: "Hotels Under ₦10,000",
      desc: "Bodija Guesthouse offers the best value with clean rooms and WiFi included.",
      tags: ["Standard: ₦8,000", "Deluxe: ₦12,000", "Breakfast: ₦1,500"],
      verified: "Verified today by Ajani's team",
      link: "Bodija Guesthouse",
    },
    {
      icon: "calendar",
      title: "Weekend Events",
      desc: "Taste of Ibadan Food Festival at Agodi Gardens with 20+ vendors and live music.",
      tags: ["Entry: ₦1,000", "Children: ₦500", "Parking: ₦300"],
      verified: "Verified today by Ajani's team",
      link: "Taste of Ibadan Festival",
    },
  ];

  return (
    <section id="toppicks" className="bg-slate-100 py-16 font-rubik">
      <div className="max-w-7xl mx-auto px-5 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 ">
            Ajani's Top Picks for You
          </h2>
          <p className="text-slate-600">
            Verified recommendations based on popular queries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                  <i className={`fas fa-${card.icon}`}></i>
                </div>
                <h3 className="font-bold text-lg">{card.title}</h3>
              </div>
              <p className="mb-4 text-slate-700">{card.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {card.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
                <i className="fas fa-check-circle text-green-500"></i>
                {card.verified}
              </div>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-lg transition shadow hover:shadow-md hover:-translate-y-0.5"
                >
                  <i className="fab fa-whatsapp"></i> Ask Ajani
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#1e293b] rounded-xl font-medium text-sm transition"
                >
                  <i className="fas fa-list text-xs"></i>
                  See More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiTopPicks;
