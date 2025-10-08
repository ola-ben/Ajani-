import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faTag,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

// Custom Hook: Fetch Data from Google Sheet
const useGoogleSheet = (sheetId, apiKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:Z1000?key=${apiKey}`
        );
        const result = await response.json();

        if (result.values && result.values.length > 1) {
          const headers = result.values[0];
          const rows = result.values.slice(1);

          const formatted = rows.map((row) => {
            const obj = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || "";
            });
            return obj;
          });

          setData(formatted);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetId, apiKey]);

  return { data, loading, error };
};

const Dashboard = () => {
  const SHEET_ID = "1ZUU4Cw29jhmSnTh1yJ_ZoQB7TN1zr2_7bcMEHP8O1_Y";
  const API_KEY = "AIzaSyCELfgRKcAaUeLnInsvenpXJRi2kSSwS3E";

  const { data: vendors, loading, error } = useGoogleSheet(SHEET_ID, API_KEY);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [tags, setTags] = useState("");

  // Filter vendors
  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      !selectedCategory || vendor.category === selectedCategory;
    const matchesArea = !selectedArea || vendor.area === selectedArea;
    const matchesPrice = parseFloat(vendor.price_from) <= maxPrice;
    const matchesTags =
      !tags || vendor.short_desc.toLowerCase().includes(tags.toLowerCase());
    return matchesCategory && matchesArea && matchesPrice && matchesTags;
  });

  // === CHART DATA ===
  const averagePricesByArea = vendors.reduce((acc, vendor) => {
    const area = vendor.area;
    const price = parseFloat(vendor.price_from) || 0;
    if (!acc[area]) acc[area] = { total: 0, count: 0 };
    acc[area].total += price;
    acc[area].count += 1;
    return acc;
  }, {});

  const avgPricesArray = Object.keys(averagePricesByArea).map((area) => ({
    area,
    price: Math.round(
      averagePricesByArea[area].total / averagePricesByArea[area].count
    ),
  }));

  const sortedAvgPricesArray = [...avgPricesArray].sort(
    (a, b) => a.price - b.price
  );

  const priceIndex = Math.round(
    vendors.reduce((sum, v) => sum + (parseFloat(v.price_from) || 0), 0) /
      vendors.length
  );

  const affordableArea = avgPricesArray.reduce(
    (min, area) => (area.price < min.price ? area : min),
    avgPricesArray[0]
  );

  const alertArea = avgPricesArray.reduce(
    (max, area) => (area.price > max.price ? area : max),
    avgPricesArray[0]
  );

  const categoryComparisonData = {
    "All Categories": [
      { name: "Food & Dining", value: 0 },
      { name: "Accommodation", value: 0 },
      { name: "Transportation", value: 0 },
      { name: "Shopping", value: 0 },
    ],
  };

  vendors.forEach((vendor) => {
    const cat = vendor.category;
    const price = parseFloat(vendor.price_from) || 0;
    if (categoryComparisonData["All Categories"]) {
      const catItem = categoryComparisonData["All Categories"].find(
        (c) => c.name === cat
      );
      if (catItem) catItem.value += price;
    }
  });

  const COLORS = ["#101828", "#05f2c1", "#3276ee", "#1ab9d6"];

  if (loading) {
    return (
      <div className="bg-gray-900 text-white p-6 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white p-6 min-h-screen">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen font-rubik">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        Ajani — Ibadan Guide (Web Dashboard)
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Category: All</option>
          {Array.from(new Set(vendors.map((v) => v.category))).map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          placeholder="Area: Bodija"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max price: ₦2000"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags: amala"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* === GRAPHS SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Price Index Card */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h4 className="text-sm font-medium text-blue-400">Price Index</h4>
          <div className="text-2xl font-bold">
            ₦{priceIndex.toLocaleString()}
          </div>
          <div className="text-green-500 text-sm mt-1 flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /> +5.2% from
            last month
          </div>
        </div>

        {/* Most Affordable Area */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h4 className="text-sm font-medium text-blue-400">
            Most Affordable Area
          </h4>
          <div className="text-2xl font-bold">{affordableArea.area}</div>
          <div className="text-green-500 text-sm mt-1 flex items-center">
            <FontAwesomeIcon icon={faArrowDown} className="mr-1" />
            {Math.round(
              ((priceIndex - affordableArea.price) / priceIndex) * 100
            )}
            % below avg
          </div>
        </div>

        {/* Price Alert */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h4 className="text-sm font-medium text-blue-400">Price Alert</h4>
          <div className="text-2xl font-bold">{alertArea.area}</div>
          <div className="text-red-500 text-sm mt-1 flex items-center">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
            {Math.round(((alertArea.price - priceIndex) / priceIndex) * 100)}%
            increase
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="font-semibold mb-4">Avg Prices by Area</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sortedAvgPricesArray}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="area" stroke="#aaa" />
              <YAxis stroke="#aaa" tickFormatter={(v) => `₦${v}`} />
              <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, "Price"]} />
              <Bar dataKey="price" fill="#05f2c1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h3 className="font-semibold mb-4">Category Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryComparisonData["All Categories"]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) =>
                  `${name}: ₦${value.toLocaleString()}`
                }
              >
                {categoryComparisonData["All Categories"].map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, "Total"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === VENDOR CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700"
          >
            <div className="mb-4">
              <img
                src={vendor.image_url || "https://via.placeholder.com/300"}
                alt={vendor.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div className="mb-2">
              <h3 className="font-bold text-xl text-blue-400">{vendor.name}</h3>
              <div className="text-sm text-gray-400">
                {vendor.area} • <FontAwesomeIcon icon={faStar} />{" "}
                {vendor.rating || "4.5"} • From ₦{vendor.price_from}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{vendor.short_desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(vendor.tags ? vendor.tags.split(",").slice(0, 3) : []).map(
                (tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                )
              )}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
              Map
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        Results: {filteredVendors.length} places • Data source: Google Sheets
        CSV • Prices indicative; last verified dates may apply.
      </div>
    </div>
  );
};

export default Dashboard;
