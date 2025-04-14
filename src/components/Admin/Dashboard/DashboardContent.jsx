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

const DashboardContent = () => (
  <div className="w-full px-4">
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
  </div>
);

export default DashboardContent;
