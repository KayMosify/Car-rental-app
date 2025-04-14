import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaCheckSquare,
  FaEdit,
  FaTimes,
  FaUndo,
} from "react-icons/fa";
import { supabase } from "../../../utils/supabase";
import { getBookings, updateCarStatus } from "../../../utils/supabase";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false); // Toggle for showing completed bookings

  const getBookings2 = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      if (!user) throw new Error("No user logged in");

      const res = await getBookings(user.id);
      setBookings(res);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus, carId = null) => {
    try {
      // Update booking status
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      // Update car status based on booking status
      if (carId) {
        try {
          let carUpdate = {};

          if (newStatus === "Completed") {
            // If booking is completed, make car available
            carUpdate = {
              available: true,
              status: "Available",
            };
          } else if (newStatus === "Active") {
            // If booking is activated, make car unavailable
            carUpdate = {
              available: false,
              status: "Booked",
            };
          } else if (newStatus === "Cancelled") {
            // If booking is cancelled, make car available again
            carUpdate = {
              available: true,
              status: "Available",
            };
          } else if (newStatus === "Pending") {
            // If booking is reverted to pending, check if car should be marked as booked
            // We should mark it as booked since it's pending confirmation
            carUpdate = {
              available: false,
              status: "Pending",
            };
          }

          // Update car status in database
          await updateCarStatus(carId, carUpdate);
        } catch (carError) {
          console.error("Failed to update car status:", carError);
        }
      }

      // Refresh the list after updating
      await getBookings2();
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  useEffect(() => {
    getBookings2();
  }, []);

  // Filter bookings to exclude completed ones unless showCompleted is true
  const filteredBookings = bookings.filter((booking) =>
    showCompleted ? true : booking.status !== "Completed"
  );

  if (loading) {
    return (
      <div className="w-full px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="mr-4">
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold">Car Bookings</h2>
        </div>
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              Show completed bookings
            </span>
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Car ID</th>
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
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">{booking.car_id}</td>
                    <td className="py-3 px-6 text-left">
                      <div>
                        <p className="font-medium">{booking.carName}</p>
                        <p className="text-xs text-gray-500">{booking.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{booking.user_name}</td>
                    <td className="py-3 px-6 text-left">
                      {booking.pickup_date}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.dropoff_date}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs 
                                ${
                                  booking.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : booking.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      {booking.total_price}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center space-x-2">
                          {/* Confirm Button */}
                          <button
                            className={`text-green-600 hover:text-green-800 ${
                              booking.status !== "Pending" ? "opacity-50" : ""
                            }`}
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "Active",
                                booking.car_id
                              )
                            }
                            title="Confirm booking"
                            disabled={booking.status !== "Pending"}
                          >
                            <FaCheckSquare />
                          </button>

                          {/* Complete Button */}
                          <button
                            className={`text-blue-600 hover:text-blue-800 ${
                              booking.status !== "Active" ? "opacity-50" : ""
                            }`}
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "Completed",
                                booking.car_id
                              )
                            }
                            title="Complete booking"
                            disabled={booking.status !== "Active"}
                          >
                            <FaCheck />
                          </button>

                          {/* Cancel Button */}
                          <button
                            className={`text-red-600 hover:text-red-800 ${
                              booking.status === "Completed" ||
                              booking.status === "Cancelled"
                                ? "opacity-50"
                                : ""
                            }`}
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "Cancelled",
                                booking.car_id
                              )
                            }
                            title="Cancel booking"
                            disabled={
                              booking.status === "Completed" ||
                              booking.status === "Cancelled"
                            }
                          >
                            <FaTimes />
                          </button>

                          {/* Revert Cancelled Button */}
                          <button
                            className={`text-purple-600 hover:text-purple-800 ${
                              booking.status !== "Cancelled" ? "opacity-50" : ""
                            }`}
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "Pending",
                                booking.car_id
                              )
                            }
                            title="Revert cancelled booking"
                            disabled={booking.status !== "Cancelled"}
                          >
                            <FaUndo />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No active bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
