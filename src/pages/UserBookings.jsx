import React from "react";

const UserBookings = () => {
  // This would typically come from your backend/state management
  const mockBookings = [
    {
      id: 1,
      carName: "Toyota Camry",
      date: "2024-03-15",
      status: "Active",
      price: "$50/day",
    },
    {
      id: 2,
      carName: "Honda Civic",
      date: "2024-03-20",
      status: "Upcoming",
      price: "$45/day",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Bookings
          </h1>

          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.carName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Date: {booking.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        booking.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {booking.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockBookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                You don't have any bookings yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
