import React from "react";

// Import icons from react-icons (using Font Awesome set)
import {
  FaHome,
  FaCar,
  FaChartBar,
  FaMoneyBill,
  FaEnvelope,
  FaCalendar,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

// Placeholder data for the component
const rentalData = {
  car: {
    name: "Nissan GT-R",
    type: "Sport Car",
    id: "#9761",
    image: "https://via.placeholder.com/300x150?text=Nissan+GT-R", // Replace with actual image URL
  },
  pickUp: {
    location: "Kota Semarang",
    date: "20 July 2022",
    time: "07:00",
  },
  dropOff: {
    location: "Kota Semarang",
    date: "21 July 2022",
    time: "01:00",
  },
  totalPrice: "$80.00",
};

const topCarRentals = [
  { type: "Sport Car", count: 17439, color: "bg-blue-900" },
  { type: "SUV", count: 9478, color: "bg-blue-700" },
  { type: "Coupe", count: 18197, color: "bg-blue-500" },
  { type: "Hatchback", count: 12510, color: "bg-blue-300" },
  { type: "MPV", count: 14406, color: "bg-blue-100" },
];

const recentTransactions = [
  {
    name: "Nissan GT-R",
    type: "Sport Car",
    price: "$80.00",
    date: "20 July",
    image: "https://via.placeholder.com/100x60?text=Nissan+GT-R",
  },
  {
    name: "Koenigsegg",
    type: "Sport Car",
    price: "$99.00",
    date: "19 July",
    image: "https://via.placeholder.com/100x60?text=Koenigsegg",
  },
  {
    name: "Rolls-Royce",
    type: "Sport Car",
    price: "$96.00",
    date: "18 July",
    image: "https://via.placeholder.com/100x60?text=Rolls-Royce",
  },
  {
    name: "CR-V",
    type: "SUV",
    price: "$80.00",
    date: "17 July",
    image: "https://via.placeholder.com/100x60?text=CR-V",
  },
];

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col justify-between">
        {/* Main Menu */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4">
            Main Menu
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center p-3 bg-blue-600 text-white rounded-lg">
              <FaHome className="mr-3" /> Dashboard
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaCar className="mr-3" /> Car Rent
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaChartBar className="mr-3" /> Cars
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaMoneyBill className="mr-3" /> Bookings
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaEnvelope className="mr-3" /> Reviews
            </li>
          </ul>
        </div>
        {/* Preferences */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4">
            Preferences
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaCog className="mr-3" /> Settings
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaQuestionCircle className="mr-3" /> Help & Center
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaMoon className="mr-3" /> Dark Mode
              <label className="ml-auto inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600">
                  <div className="w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                </div>
              </label>
            </li>
          </ul>
          <ul className="mt-4">
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FaSignOutAlt className="mr-3" /> Log Out
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Details Rental
        </h2>

        {/* Top Section: Map and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Map */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Map
            </h3>
            <div className="h-48 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Map Placeholder (Add Google Maps or similar)
              </p>
            </div>
          </div>
          {/* Top 5 Car Rental Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Top 5 Car Rental
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {topCarRentals
                    .reduce((sum, item) => sum + item.count, 0)
                    .toLocaleString()}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {topCarRentals.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <span
                      className={`w-4 h-4 ${item.color} rounded-full mr-2`}
                    ></span>
                    {item.type}: {item.count.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Rental Details and Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rental Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src={rentalData.car.image}
              alt={rentalData.car.name}
              className="h-32 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {rentalData.car.name}{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {rentalData.car.id}
              </span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {rentalData.car.type}
            </p>
            {/* Pick-Up */}
            <div className="mt-4">
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Pick-Up
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.pickUp.location}</option>
                </select>
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.pickUp.date}</option>
                </select>
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.pickUp.time}</option>
                </select>
              </div>
            </div>
            {/* Drop-Off */}
            <div className="mt-4">
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Drop-Off
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.dropOff.location}</option>
                </select>
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.dropOff.date}</option>
                </select>
                <select className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
                  <option>{rentalData.dropOff.time}</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Overall rental price includes discount
            </p>
            <h2 className="text-2xl font-bold">{rentalData.totalPrice}</h2>
          </div>
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Transaction</h3>
              <a href="#" className="text-blue-600 text-sm">
                View All
              </a>
            </div>
            <ul className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <li key={index} className="flex items-center">
                  <img
                    src={transaction.image}
                    alt={transaction.name}
                    className="w-16 h-12 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {transaction.name} ({transaction.type})
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className="font-semibold">{transaction.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
