import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faChartLine,
  faLayerGroup,
  faTag,
  faWallet,
  faBell,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const PriceInsightsDashboard = () => {
  const [selectedArea, setSelectedArea] = useState("Sango");
  const [selectedCategory, setSelectedCategory] = useState("Accommodation");
  const [priceRange, setPriceRange] = useState(9436);
  const [activeBarIndex, setActiveBarIndex] = useState(null); // Track clicked bar
  const [animatedTrendData, setAnimatedTrendData] = useState([]); // For animation on slider change

  // Mock data for charts
  const averagePricesByArea = [
    { area: "Bodija", price: 15000 },
    { area: "UI Area", price: 16500 },
    { area: "Agodi", price: 13000 },
    { area: "Dugbe", price: 11000 },
    { area: "Sango", price: 9436 },
  ];

  const basePriceTrendsData = [
    { month: "Jan", price: 4700 },
    { month: "Feb", price: 4850 },
    { month: "Mar", price: 5000 },
    { month: "Apr", price: 4900 },
    { month: "May", price: 5100 },
    { month: "Jun", price: 5300 },
  ];

  const categoryComparisonData = {
    "All Categories": [
      { name: "Food & Dining", value: 35 },
      { name: "Accommodation", value: 25 },
      { name: "Transportation", value: 20 },
      { name: "Shopping", value: 20 },
    ],
    "Food & Dining": [
      { name: "Amala", value: 40 },
      { name: "Rice & Stew", value: 30 },
      { name: "Snacks", value: 20 },
      { name: "Drinks", value: 10 },
    ],
    Accommodation: [
      { name: "Hostels", value: 30 },
      { name: "Guesthouses", value: 40 },
      { name: "Hotels", value: 20 },
      { name: "Airbnb", value: 10 },
    ],
    Transportation: [
      { name: "Bus", value: 40 },
      { name: "Taxi", value: 30 },
      { name: "Motorbike", value: 20 },
      { name: "Walking", value: 10 },
    ],
    Shopping: [
      { name: "Groceries", value: 35 },
      { name: "Clothing", value: 25 },
      { name: "Electronics", value: 20 },
      { name: "Beauty", value: 20 },
    ],
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  // Simulate price index and alerts
  const priceIndex = 12450;
  const priceIndexChange = "+5.2% from last month";
  const mostAffordableArea = "Sango";
  const affordableAreaDiscount = "18% below city average";
  const priceAlertArea = "UI Area";
  const priceAlertChange = "+12% increase";

  // Effect: Animate trend line when price range changes
  useEffect(() => {
    const animatedData = basePriceTrendsData.map((item) => ({
      ...item,
      price: item.price + (priceRange - 9436) / 100, // Simple scaling for demo
    }));
    setAnimatedTrendData(animatedData);
  }, [priceRange]);

  // Handle bar click to center/highlight
  const handleBarClick = (data, index) => {
    setActiveBarIndex(index);
    setSelectedArea(data.area);
    // You can add scroll-to-center logic here if needed
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md font-rubik" id="priceinsight">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Price Insights Dashboard
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Areas">All Areas</option>
            <option value="Bodija">Bodija</option>
            <option value="UI Area">UI Area</option>
            <option value="Agodi">Agodi</option>
            <option value="Dugbe">Dugbe</option>
            <option value="Sango">Sango</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Categories">All Categories</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Transportation">Transportation</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (₦)
          </label>
          <input
            type="range"
            min="0"
            max="25000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center mt-2 text-lg font-semibold">
            ₦{priceRange.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Average Prices by Area */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">
              Average Prices by Area
            </h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-600"
              />
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={averagePricesByArea}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis tickFormatter={(value) => `₦${value.toLocaleString()}`} />
              <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
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
                {averagePricesByArea.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Price Trends */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Price Trends</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={animatedTrendData || basePriceTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₦${value}`} />
              <Tooltip formatter={(value) => `₦${value}`} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                animationDuration={800} // Smooth animation on data change
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Comparison */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Category Comparison</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon icon={faLayerGroup} className="text-blue-600" />
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={
                  categoryComparisonData[selectedCategory] ||
                  categoryComparisonData["All Categories"]
                }
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryComparisonData[selectedCategory]?.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price Index Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Price Index</h4>
            <div className="text-2xl font-bold text-gray-800">
              ₦{priceIndex.toLocaleString()}
            </div>
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <FontAwesomeIcon icon={faArrowUp} className="mr-1" />{" "}
              {priceIndexChange}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Average spending across all categories
            </p>
          </div>
          <span className="bg-blue-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faTag} className="text-blue-600" />
          </span>
        </div>

        {/* Most Affordable Area Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-600">
              Most Affordable Area
            </h4>
            <div className="text-2xl font-bold text-gray-800">
              {mostAffordableArea}
            </div>
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <FontAwesomeIcon icon={faArrowDown} className="mr-1" />{" "}
              {affordableAreaDiscount}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Best value for food and transportation
            </p>
          </div>
          <span className="bg-blue-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faWallet} className="text-blue-600" />
          </span>
        </div>

        {/* Price Alert Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Price Alert</h4>
            <div className="text-2xl font-bold text-gray-800">
              {priceAlertArea}
            </div>
            <div className="text-red-600 text-sm mt-1 flex items-center">
              <FontAwesomeIcon icon={faArrowUp} className="mr-1" />{" "}
              {priceAlertChange}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Accommodation prices rising this month
            </p>
          </div>
          <span className="bg-blue-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faBell} className="text-blue-600" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceInsightsDashboard;
