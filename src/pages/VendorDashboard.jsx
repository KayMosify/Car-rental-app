import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

// Import icons from react-icons (using Font Awesome set)
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
  FaEdit,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

// Placeholder data for the component
const rentalData = {
  car: {
    name: "Nissan GT-R",
    type: "Sport Car",
    id: "#9761",
    image: "/api/placeholder/300/150", // Placeholder image
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
    image: "/api/placeholder/100/60",
  },
  {
    name: "Koenigsegg",
    type: "Sport Car",
    price: "$99.00",
    date: "19 July",
    image: "/api/placeholder/100/60",
  },
  {
    name: "Rolls-Royce",
    type: "Sport Car",
    price: "$96.00",
    date: "18 July",
    image: "/api/placeholder/100/60",
  },
  {
    name: "CR-V",
    type: "SUV",
    price: "$80.00",
    date: "17 July",
    image: "/api/placeholder/100/60",
  },
];

const carInventory = [
  {
    id: "CAR-001",
    name: "Nissan GT-R",
    type: "Sport Car",
    status: "Available",
    image: "/api/placeholder/100/60",
    price: "$80.00/day",
    lastMaintenance: "12 March 2022",
  },
  {
    id: "CAR-002",
    name: "Koenigsegg",
    type: "Sport Car",
    status: "Rented",
    image: "/api/placeholder/100/60",
    price: "$99.00/day",
    lastMaintenance: "05 February 2022",
  },
  {
    id: "CAR-003",
    name: "Rolls-Royce",
    type: "Luxury Car",
    status: "Maintenance",
    image: "/api/placeholder/100/60",
    price: "$96.00/day",
    lastMaintenance: "20 April 2022",
  },
  {
    id: "CAR-004",
    name: "CR-V",
    type: "SUV",
    status: "Available",
    image: "/api/placeholder/100/60",
    price: "$80.00/day",
    lastMaintenance: "30 January 2022",
  },
  {
    id: "CAR-005",
    name: "Toyota Camry",
    type: "Sedan",
    status: "Rented",
    image: "/api/placeholder/100/60",
    price: "$65.00/day",
    lastMaintenance: "15 March 2022",
  },
];

const activeRentals = [
  {
    id: "RENT-001",
    carName: "Koenigsegg",
    carType: "Sport Car",
    customerName: "John Smith",
    pickupDate: "19 July 2022",
    returnDate: "23 July 2022",
    status: "Active",
    totalPrice: "$396.00",
  },
  {
    id: "RENT-002",
    carName: "Toyota Camry",
    carType: "Sedan",
    customerName: "Sarah Johnson",
    pickupDate: "18 July 2022",
    returnDate: "20 July 2022",
    status: "Active",
    totalPrice: "$130.00",
  },
  {
    id: "RENT-003",
    carName: "Mercedes E-Class",
    carType: "Luxury Car",
    customerName: "Robert Davis",
    pickupDate: "15 July 2022",
    returnDate: "22 July 2022",
    status: "Completed",
    totalPrice: "$560.00",
  },
  {
    id: "RENT-004",
    carName: "Honda CR-V",
    carType: "SUV",
    customerName: "Emma Wilson",
    pickupDate: "12 July 2022",
    returnDate: "15 July 2022",
    status: "Completed",
    totalPrice: "$240.00",
  },
  {
    id: "RENT-005",
    carName: "BMW X5",
    carType: "SUV",
    customerName: "Michael Brown",
    pickupDate: "20 July 2022",
    returnDate: "27 July 2022",
    status: "Upcoming",
    totalPrice: "$700.00",
  },
];

const VendorDashboard = ({ supabase }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Render appropriate content based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case "car-rent":
        return <CarRentPage />;
      case "cars":
        return <CarsPage />;
      case "bookings":
        return <BookingsPage />;
      default:
        return <DashboardContent />;
    }
  };

  // Dashboard main content
  const DashboardContent = () => (
    <>
      <h2 className="text-2xl font-bold mb-6">Provider Dashboard</h2>

      {/* Top Section: Map and Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Map */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Vehicle Location</h3>
          <div className="h-48 bg-blue-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Map Placeholder (Add Google Maps or similar)
            </p>
          </div>
        </div>
        {/* Top 5 Car Rental Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top 5 Car Rental</h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
              <p className="text-2xl font-bold text-blue-800">
                {topCarRentals
                  .reduce((sum, item) => sum + item.count, 0)
                  .toLocaleString()}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {topCarRentals.map((item, index) => (
                <li key={index} className="flex items-center">
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

      {/* Bottom Section: Fleet Status and Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fleet Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Fleet Status</h3>
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <p className="text-xl font-bold text-green-600">2</p>
              </div>
              <p className="mt-2 text-sm">Available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <p className="text-xl font-bold text-blue-600">2</p>
              </div>
              <p className="mt-2 text-sm">Rented</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <p className="text-xl font-bold text-yellow-600">1</p>
              </div>
              <p className="mt-2 text-sm">Maintenance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <p className="text-xl font-bold text-purple-600">5</p>
              </div>
              <p className="mt-2 text-sm">Total</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("cars")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            View Car Inventory
          </button>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button
              onClick={() => setCurrentPage("car-rent")}
              className="text-blue-600 text-sm"
            >
              View All
            </button>
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
    </>
  );

  // Car Rent Page (Showing active rentals)
  const CarRentPage = () => (
    <>
      <div className="flex items-center mb-6">
        <button onClick={() => setCurrentPage("dashboard")} className="mr-4">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold">Car Rentals</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Rental ID</th>
                <th className="py-3 px-6 text-left">Car</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Pickup Date</th>
                <th className="py-3 px-6 text-left">Return Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-right">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {activeRentals.map((rental, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left">{rental.id}</td>
                  <td className="py-3 px-6 text-left">
                    <div>
                      <p className="font-medium">{rental.carName}</p>
                      <p className="text-xs text-gray-500">{rental.carType}</p>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{rental.customerName}</td>
                  <td className="py-3 px-6 text-left">{rental.pickupDate}</td>
                  <td className="py-3 px-6 text-left">{rental.returnDate}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-2 py-1 rounded-full text-xs 
                      ${
                        rental.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : rental.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">{rental.totalPrice}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <FaEdit className="text-blue-600 cursor-pointer mr-2" />
                      {rental.status !== "Completed" && (
                        <FaCheck className="text-green-600 cursor-pointer" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Cars Page (Showing car inventory)
  // Cars Page (Showing car inventory from Supabase)
  const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("All Car Types");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [showForm, setShowForm] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);

    // Fetch cars from Supabase
    useEffect(() => {
      const fetchCars = async () => {
        try {
          setLoading(true);
          setError(null);

          const { data, error } = await supabase
            .from("cars")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          setCars(data || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCars();
    }, []);

    // Handle car deletion
    const handleDelete = async (carId) => {
      if (window.confirm("Are you sure you want to delete this car?")) {
        try {
          const { error } = await supabase
            .from("cars")
            .delete()
            .eq("id", carId);

          if (error) throw error;

          // Refresh the list
          setCars(cars.filter((car) => car.id !== carId));
        } catch (err) {
          setError(err.message);
        }
      }
    };

    // Get unique car types for filter dropdown
    const carTypes = ["All Car Types", ...new Set(cars.map((car) => car.type))];

    // Filter cars based on selections
    const filteredCars = cars.filter((car) => {
      const typeMatch =
        selectedType === "All Car Types" || car.type === selectedType;
      const statusMatch =
        selectedStatus === "All Status" || car.status === selectedStatus;
      return typeMatch && statusMatch;
    });

    if (loading) {
      return (
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      console.error("Error fetching cars:", error);
    }

    return (
      <>
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentPage("dashboard")} className="mr-4">
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold">Car Inventory</h2>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between mb-4">
            <div className="flex">
              <select
                className="border rounded-lg p-2 mr-2"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {carTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="border rounded-lg p-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Available</option>
                <option>Rented</option>
                <option>Maintenance</option>
              </select>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                setCurrentCar(null);
                setShowForm(true);
              }}
            >
              Add New Car
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Car ID</th>
                  <th className="py-3 px-6 text-left">Car</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Last Maintenance</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <tr
                      key={car.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left">{car.id}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          {car.image_url && (
                            <img
                              src={car.image_url}
                              alt={car.name}
                              className="w-12 h-8 rounded mr-2 object-cover"
                            />
                          )}
                          <p>{car.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">{car.type}</td>
                      <td className="py-3 px-6 text-left">${car.price}/day</td>
                      <td className="py-3 px-6 text-left">
                        <span
                          className={`px-2 py-1 rounded-full text-xs 
                        ${
                          car.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "Rented"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                        >
                          {car.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {new Date(car.last_maintenance).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <FaEdit
                            className="text-blue-600 cursor-pointer mr-2"
                            onClick={() => {
                              setCurrentCar(car);
                              setShowForm(true);
                            }}
                          />
                          {car.status !== "Rented" && (
                            <FaTimes
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDelete(car.id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No cars found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // Bookings Page
  const BookingsPage = () => (
    <>
      <div className="flex items-center mb-6">
        <button onClick={() => setCurrentPage("dashboard")} className="mr-4">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold">Bookings</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search bookings..."
              className="border rounded-lg p-2 w-64 mr-2"
            />
            <select className="border rounded-lg p-2">
              <option>All Status</option>
              <option>Upcoming</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700">
              Calendar View
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              New Booking
            </button>
          </div>
        </div>

        {/* Sample Calendar View - Just a placeholder */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
              <div key={i} className="text-center font-medium p-2">
                {day}
              </div>
            ))}
            {Array(35)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-24 bg-white border rounded-lg p-1">
                  <p className="text-right text-xs text-gray-500">
                    {(i % 30) + 1}
                  </p>
                  {i === 18 && (
                    <div className="mt-1 bg-blue-100 text-blue-800 text-xs p-1 rounded">
                      <p className="truncate">Koenigsegg</p>
                      <p className="truncate">J. Smith</p>
                    </div>
                  )}
                  {i === 19 && (
                    <div className="mt-1 bg-blue-100 text-blue-800 text-xs p-1 rounded">
                      <p className="truncate">Koenigsegg</p>
                      <p className="truncate">J. Smith</p>
                    </div>
                  )}
                  {i === 20 && (
                    <div className="mt-1 bg-green-100 text-green-800 text-xs p-1 rounded">
                      <p className="truncate">BMW X5</p>
                      <p className="truncate">M. Brown</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        {/* Main Menu */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 mb-4">Main Menu</h4>
          <ul className="space-y-2">
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                currentPage === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage("dashboard")}
            >
              <FaHome className="mr-3" /> Dashboard
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                currentPage === "car-rent"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage("car-rent")}
            >
              <FaCar className="mr-3" /> Car Rent
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                currentPage === "cars"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage("cars")}
            >
              <FaChartBar className="mr-3" /> Cars
            </li>
            <li
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                currentPage === "bookings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage("bookings")}
            >
              <FaMoneyBill className="mr-3" /> Bookings
            </li>
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaEnvelope className="mr-3" /> Reviews
            </li>
          </ul>
        </div>
        {/* Preferences */}
        <div>
          <h4 className="text-xs uppercase text-gray-500 mb-4">Preferences</h4>
          <ul className="space-y-2">
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaCog className="mr-3" /> Settings
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

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default VendorDashboard;
