import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCar,
  FaChartBar,
  FaMoneyBill,
  FaEnvelope,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

  // Helper function to determine if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full w-64 shadow-lg bg-white dark:bg-gray-800">
      <div className="h-full bg-white dark:bg-gray-800 p-6 flex flex-col overflow-y-auto">
        {/* Close button for mobile - only visible on small screens */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close menu"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo/Brand - you can add your logo here */}
        <div className="mb-8 mt-16">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">
            Car Rental Admin
          </h2>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4">
            Main Menu
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaHome className="mr-3" /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/cars"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/cars")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaCar className="mr-3" /> Cars
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/bookings")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaMoneyBill className="mr-3" /> Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/car-rent")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <IoMdArrowRoundBack className="mr-3" /> Back to Home
              </Link>
            </li>
          </ul>
        </div>
        {/* Preferences */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-4">
            Preferences
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/settings")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaCog className="mr-3" /> Settings
              </Link>
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <FaQuestionCircle className="mr-3" /> Help & Center
            </li>
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
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
            <li className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
              <FaSignOutAlt className="mr-3" /> Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
