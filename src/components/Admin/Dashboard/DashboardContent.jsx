import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  DollarSign,
  ArrowRight,
} from "lucide-react";
  // Adjust the import

const rentalData = {
  car: {
    name: "Nissan GT-R",
    type: "Sport Car",
    id: "#9761",
    image: "/api/placeholder/300/150",
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

// Manually create the public URL
// const publicUrl = `${supabaseUrl}/storage/v1/object/public/car-images/${data.path}`;

const topCarRentals = [
  { type: "Sport Car", count: 17439, color: "#0a2463" },
  { type: "SUV", count: 9478, color: "#1e56a0" },
  { type: "Coupe", count: 18197, color: "#3a7ca5" },
  { type: "Hatchback", count: 12510, color: "#81c3d7" },
  { type: "MPV", count: 14406, color: "#d6e8ee" },
];

const recentTransactions = [
  {
    name: "Nissan GT-R",
    type: "Sport Car",
    price: "$80.00",
    date: "20 July",
    image: "/api/placeholder/100/60",
    details: {
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
      customerName: "Alex Johnson",
      status: "Active",
    },
  },
  {
    name: "Koenigsegg",
    type: "Sport Car",
    price: "$99.00",
    date: "19 July",
    image: "/api/placeholder/100/60",
    details: {
      pickUp: {
        location: "Kota Semarang",
        date: "19 July 2022",
        time: "10:00",
      },
      dropOff: {
        location: "Jakarta",
        date: "23 July 2022",
        time: "14:00",
      },
      customerName: "Maria Chen",
      status: "Active",
    },
  },
  {
    name: "Rolls-Royce",
    type: "Sport Car",
    price: "$96.00",
    date: "18 July",
    image: "/api/placeholder/100/60",
    details: {
      pickUp: {
        location: "Jakarta",
        date: "18 July 2022",
        time: "09:00",
      },
      dropOff: {
        location: "Jakarta",
        date: "20 July 2022",
        time: "17:00",
      },
      customerName: "David Wilson",
      status: "Active",
    },
  },
  {
    name: "CR-V",
    type: "SUV",
    price: "$80.00",
    date: "17 July",
    image: "/api/placeholder/100/60",
    details: {
      pickUp: {
        location: "Bandung",
        date: "17 July 2022",
        time: "08:30",
      },
      dropOff: {
        location: "Kota Semarang",
        date: "19 July 2022",
        time: "12:00",
      },
      customerName: "Sarah Miller",
      status: "Completed",
    },
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

const MapComponent = () => (
  <div className="relative h-48 overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-blue-50">
      {/* SVG Map */}
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Background map features */}
        <path d="M0,0 L800,0 L800,400 L0,400 Z" fill="#f0f7fa" />

        {/* Water features */}
        <path
          d="M600,100 Q650,150 700,120 Q750,90 800,150 L800,400 L600,400 Z"
          fill="#cce3f0"
        />

        {/* Main roads */}
        <path
          d="M100,100 L300,100 L500,250 L700,250"
          stroke="#a0a0a0"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M200,50 L200,350"
          stroke="#a0a0a0"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M400,50 L400,350"
          stroke="#a0a0a0"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M500,250 L500,350"
          stroke="#a0a0a0"
          strokeWidth="8"
          fill="none"
        />

        {/* Secondary roads */}
        <path
          d="M150,50 L150,350"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M250,50 L250,350"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M350,50 L350,350"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M450,50 L450,350"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M100,150 L700,150"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M100,200 L700,200"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M100,300 L700,300"
          stroke="#c0c0c0"
          strokeWidth="4"
          fill="none"
        />

        {/* Car route */}
        <path
          d="M200,100 L400,100 L500,250 L500,300"
          stroke="#3b82f6"
          strokeWidth="6"
          fill="none"
        />

        {/* Start point */}
        <circle cx="200" cy="100" r="10" fill="#3b82f6" />

        {/* End point */}
        <circle cx="500" cy="300" r="10" fill="#3b82f6" />
        <circle cx="500" cy="300" r="5" fill="white" />

        {/* Car location */}
        <circle cx="500" cy="250" r="12" fill="#3b82f6" />
        <path
          d="M495,250 L505,250 M500,245 L500,255"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
    <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow">
      Interactive Map
    </div>
  </div>
);

// Custom donut chart component
const DonutChart = ({ data, totalRentals }) => {
  // Calculate the circumference of the circle
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Calculate stroke-dasharray for each segment
  let accumulatedPercent = 0;
  const segments = data.map((item, index) => {
    const percent = item.count / total;
    const dashArray = `${circumference * percent} ${
      circumference * (1 - percent)
    }`;
    const rotation = accumulatedPercent * 360;
    accumulatedPercent += percent;

    return {
      ...item,
      dashArray,
      rotation,
      percent,
    };
  });

  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="-100 -100 200 200" className="w-full h-full max-w-full">
        {segments.map((segment, index) => {
          const startAngle = segment.rotation * (Math.PI / 180);
          const segmentLength = segment.percent * (2 * Math.PI);
          const endAngle = startAngle + segmentLength;

          const x1 = Math.sin(startAngle) * 80;
          const y1 = -Math.cos(startAngle) * 80;
          const x2 = Math.sin(endAngle) * 80;
          const y2 = -Math.cos(endAngle) * 80;

          const largeArc = segment.percent > 0.5 ? 1 : 0;

          const pathData = `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

          return <path key={index} d={pathData} fill={segment.color} />;
        })}
        <circle cx="0" cy="0" r="60" fill="white" />

        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold"
          fill="#1e40af"
        >
          {totalRentals.toLocaleString()}
        </text>
        <text
          x="0"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs"
          fill="#6b7280"
        >
          Total Rentals
        </text>
      </svg>
    </div>
  );
};

const DashboardContent = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(
    recentTransactions[0]
  );
  const [viewMode, setViewMode] = useState("dashboard");
  const [hasBookings, setHasBookings] = useState(true);

  const totalRentals = topCarRentals.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-bold mb-6">Provider Dashboard</h2>

      {/* Top Section: Map and Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Map */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Vehicle Location</h3>
          <MapComponent />
        </div>

        {/* Top 5 Car Rental Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top 5 Car Rental</h3>
          <DonutChart data={topCarRentals} totalRentals={totalRentals} />
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {topCarRentals.map((item, index) => (
              <li key={index} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-sm">
                  {item.type}: {item.count.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Fleet Status and Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Selected car details or Fleet Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {viewMode === "carDetails" && selectedTransaction ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Rental Details</h3>
                <button
                  onClick={() => setViewMode("dashboard")}
                  className="text-blue-600 text-sm flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-1" /> Back to Dashboard
                </button>
              </div>
              <div className="mb-4">
                <img
                  src={selectedTransaction.image}
                  alt={selectedTransaction.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-bold">
                  {selectedTransaction.name}
                </h4>
                <p className="text-gray-600">{selectedTransaction.type}</p>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">
                  Customer: {selectedTransaction.details.customerName}
                </p>
                <p className="text-sm text-blue-700">
                  Status: {selectedTransaction.details.status}
                </p>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Pick-up Location</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.pickUp.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Pick-up Date</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.pickUp.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <div>
                    <p className="font-medium">Pick-up Time</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.pickUp.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  <div>
                    <p className="font-medium">Drop-off Location</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.dropOff.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-red-600" />
                  <div>
                    <p className="font-medium">Drop-off Date</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.dropOff.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  <div>
                    <p className="font-medium">Drop-off Time</p>
                    <p className="text-gray-600">
                      {selectedTransaction.details.dropOff.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Total Price</p>
                <p className="text-xl font-bold">{selectedTransaction.price}</p>
              </div>
            </>
          ) : (
            <>
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
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <Car className="w-5 h-5 mr-2" />
                View Car Inventory
              </button>
            </>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button className="text-blue-600 text-sm flex items-center">
              View All
            </button>
          </div>

          {hasBookings ? (
            <ul className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors ${
                    selectedTransaction === transaction &&
                    viewMode === "carDetails"
                      ? "bg-blue-50 border border-blue-200"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setViewMode("carDetails");
                  }}
                >
                  <img
                    src={transaction.image_url}
                    alt={transaction.name}
                    className="w-16 h-12 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {transaction.name}{" "}
                      <span className="text-sm text-gray-500">
                        ({transaction.type})
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{transaction.price}</p>
                    <p
                      className={`text-xs ${
                        transaction.details.status === "Active"
                          ? "text-green-500"
                          : transaction.details.status === "Completed"
                          ? "text-blue-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {transaction.details.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-600">
                No cars booked yet
              </p>
              <p className="text-sm text-gray-500 text-center mt-2">
                When customers book cars, they will appear here
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Add New Booking
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              className="text-blue-600 text-sm"
              onClick={() => setHasBookings(!hasBookings)}
            >
              {hasBookings ? "Show Empty State" : "Show Bookings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
