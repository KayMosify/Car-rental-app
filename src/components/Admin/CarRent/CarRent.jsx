import React from "react";
import { FaArrowLeft, FaCheck, FaEdit } from "react-icons/fa";

const CarRent = () => {
  return (
    <div className="w-full px-4">
      <div className="flex items-center mb-6">
        <button className="mr-4">
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
    </div>
  );
};

export default CarRent;
