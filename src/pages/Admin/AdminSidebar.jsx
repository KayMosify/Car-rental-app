// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaHome,
//   FaCar,
//   FaChartBar,
//   FaMoneyBill,
//   FaEnvelope,
//   FaCog,
//   FaQuestionCircle,
//   FaMoon,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   const location = useLocation();

//   // Helper function to determine if a route is active
//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <div className="w-64">
//       <div className=" bg-white p-6 flex flex-col justify-between">
//         {/* Main Menu */}
//         <div>
//           <h4 className="text-xs uppercase text-gray-500 mb-4">Main Menu</h4>
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/admin/dashboard"
//                 className={`flex items-center p-3 rounded-lg ${
//                   isActive("/admin/dashboard")
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <FaHome className="mr-3" /> Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/cars"
//                 className={`flex items-center p-3 rounded-lg ${
//                   isActive("/admin/car-rent")
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <FaCar className="mr-3" /> Car Rent
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/admin/cars"
//                 className={`flex items-center p-3 rounded-lg ${
//                   isActive("/admin/cars")
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <FaChartBar className="mr-3" /> Cars
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/admin/bookings"
//                 className={`flex items-center p-3 rounded-lg ${
//                   isActive("/admin/bookings")
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <FaMoneyBill className="mr-3" /> Bookings
//               </Link>
//             </li>
//           </ul>
//         </div>
//         {/* Preferences */}
//         <div>
//           <h4 className="text-xs uppercase text-gray-500 mb-4">Preferences</h4>
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/admin/settings"
//                 className={`flex items-center p-3 rounded-lg ${
//                   isActive("/admin/settings")
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <FaCog className="mr-3" /> Settings
//               </Link>
//             </li>
//             <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
//               <FaQuestionCircle className="mr-3" /> Help & Center
//             </li>
//             <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
//               <FaMoon className="mr-3" /> Dark Mode
//               <label className="ml-auto inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
//                   <div className="w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
//                 </div>
//               </label>
//             </li>
//           </ul>
//           <ul className="mt-4">
//             <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
//               <FaSignOutAlt className="mr-3" /> Log Out
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
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

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

  // Helper function to determine if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full w-64 shadow-lg bg-white">
      <div className="h-full bg-white p-6 flex flex-col overflow-y-auto">
        {/* Close button for mobile - only visible on small screens */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close menu"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo/Brand - you can add your logo here */}
        <div className="mb-8 mt-4">
          <h2 className="text-xl font-bold text-blue-700">Car Rental Admin</h2>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <h4 className="text-xs uppercase text-gray-500 mb-4">Main Menu</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaHome className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/car-rent")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaCar className="mr-3" /> Car Rent
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cars"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/cars")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChartBar className="mr-3" /> Cars
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/bookings")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaMoneyBill className="mr-3" /> Bookings
              </Link>
            </li>
          </ul>
        </div>
        {/* Preferences */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 mb-4">Preferences</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center p-3 rounded-lg ${
                  isActive("/admin/settings")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaCog className="mr-3" /> Settings
              </Link>
            </li>
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaQuestionCircle className="mr-3" /> Help & Center
            </li>
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaMoon className="mr-3" /> Dark Mode
              <label className="ml-auto inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
                  <div className="w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                </div>
              </label>
            </li>
          </ul>
          <ul className="mt-4">
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaSignOutAlt className="mr-3" /> Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;