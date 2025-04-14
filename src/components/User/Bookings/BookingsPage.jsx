import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaCar } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { getBookings } from "../../../utils/supabase";

const BookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Current"); // Default filter is "Current"
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        if (user) {
          const bookingsData = await getBookings(user.id);
          setBookings(bookingsData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter bookings based on status
  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "Current") {
      return ["Pending", "Active"].includes(booking.status);
    } else if (activeFilter === "Completed") {
      return booking.status === "Completed";
    } else if (activeFilter === "Cancelled") {
      return booking.status === "Cancelled";
    } else {
      return true; // "All" filter
    }
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Not Authorized
          </h2>
          <p className="text-gray-600">Please log in to view your bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile, shown on md and up */}
      <div className="hidden md:block w-64 bg-white shadow-md">
        <div className="p-6 bg-blue-400 text-white font-bold text-lg">
          My Account
        </div>
        <nav className="p-4">
          <Link
            to="/cars"
            className="flex items-center p-3 mb-2 gap-2 hover:text-blue-700 bg-blue-50  rounded"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-3 mb-2 gap-2  hover:text-blue-700   bg-blue-50  rounded"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-3 mb-2  hover:text-blue-700  bg-blue-50 rounded"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            Profile
          </Link>

          <Link
            to="/user/bookings"
            className="flex items-center p-3 mb-2 bg-blue-50 text-blue-700 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
              <path
                fillRule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Bookings
          </Link>
        </nav>
      </div>

      {/* Mobile navigation - visible only on small screens */}
      <div className="md:hidden bg-white shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">My Account</h1>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2">
          <Link
            to="/cars"
            className="flex items-center p-2 gap-2 bg-blue-50 hover:text-blue-700 text-gray-700 rounded whitespace-nowrap"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-2 gap-2 bg-blue-50 hover:text-blue-700 text-gray-700 rounded whitespace-nowrap"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-2 bg-blue-50 hover:text-blue-700 rounded whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            Profile
          </Link>
          <Link
            to="/user/bookings"
            className="flex items-center p-2  bg-blue-50 text-blue-700 rounded whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
              <path
                fillRule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Bookings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-0 md:mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6">
            Booking Details
          </h2>
          {/* Filter Tabs */}
          <div className="flex flex-wrap bg-white rounded-lg shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter("Current")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex-1 sm:flex-auto rounded-tl-lg sm:rounded-l-lg ${
                activeFilter === "Current"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Current
            </button>
            <button
              onClick={() => setActiveFilter("Completed")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex-1 sm:flex-auto ${
                activeFilter === "Completed"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveFilter("Cancelled")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex-1 sm:flex-auto ${
                activeFilter === "Cancelled"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancelled
            </button>
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex-1 sm:flex-auto rounded-tr-lg sm:rounded-r-lg ${
                activeFilter === "All"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            {/* Table for medium screens and larger */}
            <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Booked
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(booking.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm text-gray-900">
                          🚗 {booking.carName || booking.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.pickup_date}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.dropoff_date}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      $ {booking.total_price}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Card layout for small screens */}
            <div className="sm:hidden divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-900">
                      🚗 {booking.carName || booking.name}
                    </div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Pickup:</span>
                    <span>{booking.pickup_date}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Return:</span>
                    <span>{booking.dropoff_date}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Booked on:</span>
                    <span>
                      {new Date(booking.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-right mt-2">
                    $ {booking.total_price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-gray-500 mb-4">
              <svg
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeFilter === "Current"
                ? "No Active Bookings"
                : activeFilter === "Completed"
                ? "No Completed Bookings"
                : activeFilter === "Cancelled"
                ? "No Cancelled Bookings"
                : "No Bookings Found"}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFilter === "Current"
                ? "You don't have any active or pending bookings."
                : activeFilter === "Completed"
                ? "You don't have any completed bookings yet."
                : activeFilter === "Cancelled"
                ? "You don't have any cancelled bookings."
                : "You haven't made any bookings yet."}
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
