import React, { useState, useEffect } from "react";

const SAMPLE_DATA = [
  {
    id: "1",
    name: "Amala Skye",
    category: "food.amala",
    area: "Bodija",
    short_desc: "Authentic amala with assorted meats in a cozy setting",
    price_from: 1200,
    whatsapp: "+2348012345678",
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW1hbGElMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tags: "Amala:1200, Ewedu:500, Gbegiri:700, Assorted:1500, Rice:1000, Chicken:2500",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Bodija Guesthouse",
    category: "accommodation.hotel",
    area: "Bodija",
    short_desc: "Affordable rooms with WiFi near the university",
    price_from: 8000,
    whatsapp: "+2348023456789",
    image_url:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    tags: "Standard Room:8000, Deluxe Room:12000, WiFi:0, Parking:0, Breakfast:1500",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Tech Hub Cafe",
    category: "food.cafe",
    area: "UI Area",
    short_desc: "Coffee, snacks and fast internet for digital workers",
    price_from: 1500,
    whatsapp: "+2348034567890",
    image_url:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    tags: "Coffee:1500, Cake:1200, Sandwich:2000, WiFi:0, Workspace:500/hr",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Agodi Gardens",
    category: "event.weekend",
    area: "Agodi",
    short_desc: "Family-friendly recreation park with events every weekend",
    price_from: 1000,
    whatsapp: "+2348045678901",
    image_url:
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    tags: "Entry:1000, Children:500, Boat Ride:2000, Zoo:500, Parking:300",
    rating: 4.3,
  },
];

const CATEGORIES = [
  { value: "", label: "All categories" },
  {
    group: "Food",
    options: [
      { value: "food.amala", label: "Food · Amala" },
      { value: "food.restaurant", label: "Food · Restaurant" },
      { value: "food.cafe", label: "Food · Cafe" },
      { value: "food.barbecue", label: "Food · Barbecue" },
    ],
  },
  {
    group: "Accommodation",
    options: [
      { value: "accommodation.hotel", label: "Hotel" },
      { value: "accommodation.airbnb", label: "Airbnb" },
      { value: "accommodation.shortlet", label: "Short-let" },
    ],
  },
  {
    group: "Events",
    options: [
      { value: "event.weekend", label: "Weekend" },
      { value: "event.tech", label: "Tech" },
      { value: "event.wedding", label: "Wedding" },
    ],
  },
  {
    group: "Shopping",
    options: [
      { value: "shopping.mall", label: "Mall" },
      { value: "shopping.market", label: "Market" },
      { value: "shopping.fashion", label: "Fashion" },
    ],
  },
  {
    group: "Transport",
    options: [
      { value: "transport.ridehail", label: "Ride-hail" },
      { value: "transport.dispatch", label: "Dispatch" },
    ],
  },
];

const Directory = () => {
  const [listings] = useState(SAMPLE_DATA);
  const [filtered, setFiltered] = useState(SAMPLE_DATA);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

  const areas = [
    ...new Set(listings.map((item) => item.area).filter(Boolean)),
  ].sort();

  useEffect(() => {
    let result = listings.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.short_desc &&
          item.short_desc.toLowerCase().includes(search.toLowerCase())) ||
        (item.tags && item.tags.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = category ? item.category === category : true;
      const matchesArea = area ? item.area === area : true;
      const matchesPrice = !item.price_from || item.price_from <= maxPrice;
      return matchesSearch && matchesCat && matchesArea && matchesPrice;
    });
    setFiltered(result);
  }, [search, category, area, maxPrice]);

  const formatPrice = (n) => (n ? n.toLocaleString() : "–");

  return (
    <section id="directory" className="max-w-7xl mx-auto px-5 py-12 font-rubik">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Full Business Directory</h2>
          <p className="text-slate-600">
            Browse all verified businesses in Ibadan
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search businesses or items..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat, i) =>
                cat.group ? (
                  <optgroup key={i} label={cat.group}>
                    {cat.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All areas</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Max price (₦)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <input
                type="number"
                min="0"
                max="100000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 p-1 border border-slate-300 rounded text-center"
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg text-slate-500">
            <i className="fas fa-search text-4xl mb-4 block text-slate-400"></i>
            <h4 className="font-semibold mb-2">No results found</h4>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow hover:shadow-md hover:-translate-y-1 transition flex flex-col h-full"
              >
                <img
                  src={
                    item.image_url ||
                    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  }
                  alt={item.name}
                  className="w-full h-44 object-cover bg-slate-100"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="text-sm text-slate-600 mb-2">
                    <span>{item.area}</span> • <span>{item.category}</span>
                  </div>
                  <p className="text-slate-700 text-sm mb-3 flex-grow">
                    {item.short_desc}
                  </p>
                  <div className="font-bold mb-2">
                    From ₦{formatPrice(item.price_from)}
                  </div>
                  {item.rating && (
                    <div className="text-yellow-500 text-sm mb-2">
                      ⭐ {item.rating}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.split(",").map((tag, i) => {
                      const [name, price] = tag.trim().split(":");
                      return price ? (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {name} ₦{parseInt(price).toLocaleString()}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="bg-slate-200 px-2 py-1 rounded text-xs"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-auto flex gap-2">
                    <a
                      href={`https://wa.me/${
                        item.whatsapp || "2348123456789"
                      }?text=${encodeURIComponent(
                        "Tell me more about " + item.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium flex-1 justify-center"
                    >
                      <i className="fas fa-comment"></i> Ask Ajani
                    </a>
                    <a
                      href="#vendors"
                      className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-2 rounded text-sm font-medium justify-center"
                    >
                      <i className="fas fa-store"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Directory;
