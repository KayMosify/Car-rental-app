import React from "react";
import { FaArrowLeft, FaCheck, FaEdit } from "react-icons/fa";

const CarRent = () => {
  return (
    <div className="w-full px-4">
      <div className="flex items-center mb-6">
        <button className="mr-4">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold dark:text-white">Car Rentals</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
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
            <tbody className="text-gray-600 dark:text-gray-300 text-sm">
              {activeRentals.map((rental, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-6 text-left">{rental.id}</td>
                  <td className="py-3 px-6 text-left">
                    <div>
                      <p className="font-medium dark:text-white">
                        {rental.carName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {rental.carType}
                      </p>
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
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : rental.status === "Completed"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          }`}
                    >
                      {rental.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">{rental.totalPrice}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <FaEdit className="text-blue-600 dark:text-blue-400 cursor-pointer mr-2" />
                      {rental.status !== "Completed" && (
                        <FaCheck className="text-green-600 dark:text-green-400 cursor-pointer" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarRent;
