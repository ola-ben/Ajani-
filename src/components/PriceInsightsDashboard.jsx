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
  Legend,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowUp,
  faArrowDown,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

// ✅ Custom Hook: Fetch Data from Google Sheet
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
        console.error("Fetch error:", err);
        setError("Failed to load data. Check console for details.");
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

  const [selectedCategory, setSelectedCategory] = useState("Accommodation");
  const [selectedArea, setSelectedArea] = useState("");
  const [activeBarIndex, setActiveBarIndex] = useState(null);

  // Filter vendors by category
  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === "All" || vendor.category === selectedCategory;
    const matchesArea = !selectedArea || vendor.area === selectedArea;
    return matchesCategory && matchesArea;
  });

  // === CHART DATA ===
  const averagePricesByArea = filteredVendors.reduce((acc, vendor) => {
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

  const priceIndex = avgPricesArray.length
    ? Math.round(
        avgPricesArray.reduce((sum, item) => sum + item.price, 0) /
          avgPricesArray.length
      )
    : 0;

  // ✅ Safe fallbacks
  const affordableArea =
    avgPricesArray.length > 0
      ? avgPricesArray.reduce(
          (min, area) => (area.price < min.price ? area : min),
          avgPricesArray[0]
        )
      : { area: "—", price: 0 };

  const alertArea =
    avgPricesArray.length > 0
      ? avgPricesArray.reduce(
          (max, area) => (area.price > max.price ? area : max),
          avgPricesArray[0]
        )
      : { area: "—", price: 0 };

  // Category Comparison Data (by price)
  const categoryComparisonData = [
    {
      name: "Accommodation",
      value: 0,
    },
    {
      name: "Transportation",
      value: 0,
    },
    {
      name: "Weekend Event",
      value: 0,
    },
  ];

  filteredVendors.forEach((vendor) => {
    const cat = vendor.category;
    const price = parseFloat(vendor.price_from) || 0;

    if (cat === "accommodation.hotel") {
      categoryComparisonData[0].value += price;
    } else if (cat === "transport.ridehail") {
      categoryComparisonData[1].value += price;
    } else if (cat === "event.weekend") {
      categoryComparisonData[2].value += price;
    }
  });

  const COLORS = ["#101828", "#05f2c1", "#3276ee"];

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Simple reload — you can replace with refetch logic later
    }, 90000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle bar click
  const handleBarClick = (data, index) => {
    setActiveBarIndex(index);
    setSelectedArea(data.area);
  };

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
      <h1 className="text-2xl font-bold mb-6">Ajani — Ibadan Price Insights</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="accommodation.hotel">Accommodation</option>
          <option value="transport.ridehail">Transportation</option>
          <option value="event.weekend">Weekend Event</option>
        </select>

        <input
          type="text"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          placeholder="Area: Bodija"
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Average Prices by Area</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-[#1ab9d6]"
              />
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sortedAvgPricesArray}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="area" stroke="#aaa" />
              <YAxis stroke="#aaa" tickFormatter={(v) => `₦${v}`} />
              <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, "Price"]} />
              <Bar
                dataKey="price"
                onClick={handleBarClick}
                activeBar={
                  <rect
                    fill="#10b981"
                    stroke="#000"
                    strokeWidth={2}
                    filter="url(#shadow)"
                  />
                }
                style={{ cursor: "pointer" }}
              >
                {sortedAvgPricesArray.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Category Comparison</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon icon={faLayerGroup} className="text-[#1ab9d6]" />
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryComparisonData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) =>
                  `${name}: ₦${value.toLocaleString()}`
                }
              >
                {categoryComparisonData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `₦${v.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
