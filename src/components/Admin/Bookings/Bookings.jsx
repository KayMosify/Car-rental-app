// import React, { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCheck,
//   FaCheckSquare,
//   FaEdit,
//   FaTimes,
//   FaUndo,
// } from "react-icons/fa";
// import { supabase } from "../../../utils/supabase";
// import { getBookings, updateCarStatus } from "../../../utils/supabase";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCompleted, setShowCompleted] = useState(false); // Toggle for showing completed bookings

//   const getBookings2 = async () => {
//     try {
//       setLoading(true);

//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error) throw error;
//       if (!user) throw new Error("No user logged in");

//       const res = await getBookings(user.id);
//       setBookings(res);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateBookingStatus = async (bookingId, newStatus, carId = null) => {
//     try {
//       // Update booking status
//       const { error } = await supabase
//         .from("bookings")
//         .update({ status: newStatus })
//         .eq("id", bookingId);

//       if (error) throw error;

//       // Update car status based on booking status
//       if (carId) {
//         try {
//           let carUpdate = {};

//           if (newStatus === "Completed") {
//             // If booking is completed, make car available
//             carUpdate = {
//               available: true,
//               status: "Available",
//             };
//           } else if (newStatus === "Active") {
//             // If booking is activated, make car unavailable
//             carUpdate = {
//               available: false,
//               status: "Booked",
//             };
//           } else if (newStatus === "Cancelled") {
//             // If booking is cancelled, make car available again
//             carUpdate = {
//               available: true,
//               status: "Available",
//             };
//           } else if (newStatus === "Pending") {
//             // If booking is reverted to pending, check if car should be marked as booked
//             // We should mark it as booked since it's pending confirmation
//             carUpdate = {
//               available: false,
//               status: "Pending",
//             };
//           }

//           // Update car status in database
//           await updateCarStatus(carId, carUpdate);
//         } catch (carError) {
//           console.error("Failed to update car status:", carError);
//         }
//       }

//       // Refresh the list after updating
//       await getBookings2();
//     } catch (error) {
//       console.error("Failed to update booking status:", error);
//     }
//   };

//   useEffect(() => {
//     getBookings2();
//   }, []);

//   // Filter bookings to exclude completed ones unless showCompleted is true
//   const filteredBookings = bookings.filter((booking) =>
//     showCompleted ? true : booking.status !== "Completed"
//   );

//   if (loading) {
//     return (
//       <div className="w-full dark:bg-gray-800 px-4">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full dark:bg-gray-800 px-4">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <button className="mr-4">
//             <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
//           </button>
//           <h2 className="text-2xl font-bold dark:text-white">Car Bookings</h2>
//         </div>
//         <div className="flex items-center">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               checked={showCompleted}
//               onChange={() => setShowCompleted(!showCompleted)}
//               className="mr-2 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-600"
//             />
//             <span className="text-sm text-gray-600 dark:text-gray-300">
//               Show completed bookings
//             </span>
//           </label>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700/50 mb-6">
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white dark:bg-gray-800">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left">Car ID</th>
//                 <th className="py-3 px-6 text-left">Car</th>
//                 <th className="py-3 px-6 text-left">Customer</th>
//                 <th className="py-3 px-6 text-left">Customer ID</th>
//                 <th className="py-3 px-6 text-left">Pickup Date</th>
//                 <th className="py-3 px-6 text-left">Return Date</th>
//                 <th className="py-3 px-6 text-left">Status</th>
//                 <th className="py-3 px-6 text-right">Price</th>
//                 <th className="py-3 px-6 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 dark:text-gray-300 text-sm">
//               {filteredBookings.length > 0 ? (
//                 filteredBookings.map((booking, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   >
//                     <td className="py-3 px-6 text-left">{booking.car_id}</td>
//                     <td className="py-3 px-6 text-left">
//                       <div>
//                         <p className="font-medium dark:text-white">
//                           {booking.carName}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {booking.name}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="py-3 px-6 text-left">{booking.user_name}</td>
//                     <td className="py-3 px-6 text-left">{booking.user_id}</td>
//                     <td className="py-3 px-6 text-left">
//                       {booking.pickup_date}
//                     </td>
//                     <td className="py-3 px-6 text-left">
//                       {booking.dropoff_date}
//                     </td>
//                     <td className="py-3 px-6 text-left">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs
//                                 ${
//                                   booking.status === "Active"
//                                     ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
//                                     : booking.status === "Completed"
//                                     ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
//                                     : booking.status === "Cancelled"
//                                     ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
//                                     : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
//                                 }`}
//                       >
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-6 text-right dark:text-white">
//                       {booking.total_price}
//                     </td>
//                     <td className="py-3 px-6 text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         <div className="flex items-center space-x-2">
//                           {/* Confirm Button */}
//                           <button
//                             className={`text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 ${
//                               booking.status !== "Pending" ? "opacity-50" : ""
//                             }`}
//                             onClick={() =>
//                               updateBookingStatus(
//                                 booking.id,
//                                 "Active",
//                                 booking.car_id
//                               )
//                             }
//                             title="Confirm booking"
//                             disabled={booking.status !== "Pending"}
//                           >
//                             <FaCheckSquare />
//                           </button>

//                           {/* Complete Button */}
//                           <button
//                             className={`text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ${
//                               booking.status !== "Active" ? "opacity-50" : ""
//                             }`}
//                             onClick={() =>
//                               updateBookingStatus(
//                                 booking.id,
//                                 "Completed",
//                                 booking.car_id
//                               )
//                             }
//                             title="Complete booking"
//                             disabled={booking.status !== "Active"}
//                           >
//                             <FaCheck />
//                           </button>

//                           {/* Cancel Button */}
//                           <button
//                             className={`text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 ${
//                               booking.status === "Completed" ||
//                               booking.status === "Cancelled"
//                                 ? "opacity-50"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               updateBookingStatus(
//                                 booking.id,
//                                 "Cancelled",
//                                 booking.car_id
//                               )
//                             }
//                             title="Cancel booking"
//                             disabled={
//                               booking.status === "Completed" ||
//                               booking.status === "Cancelled"
//                             }
//                           >
//                             <FaTimes />
//                           </button>

//                           {/* Revert Cancelled Button */}
//                           <button
//                             className={`text-purple-600 hover:text-purple-800 ${
//                               booking.status !== "Cancelled" ? "opacity-50" : ""
//                             }`}
//                             onClick={() =>
//                               updateBookingStatus(
//                                 booking.id,
//                                 "Pending",
//                                 booking.car_id
//                               )
//                             }
//                             title="Revert cancelled booking"
//                             disabled={booking.status !== "Cancelled"}
//                           >
//                             <FaUndo />
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="py-4 text-center text-gray-600 dark:text-gray-400"
//                   >
//                     No bookings found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;

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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          cars:car_id (name, car_type, year)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }

      if (!data) {
        console.warn("No data returned from bookings query");
        return [];
      }

      // Transform data to match your existing structure
      const formattedBookings = data.map((booking) => ({
        ...booking,
        carName: booking.cars?.car_type || "Unknown", // Using car_type instead of model
        name: booking.cars?.name || "Unknown",
      }));

      return formattedBookings;
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      setError(`Failed to fetch bookings: ${error.message || error}`);
      return [];
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          cars:car_id (name, car_type, year)
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }

      // Transform data to match your existing structure
      const formattedBookings = data.map((booking) => ({
        ...booking,
        carName: booking.cars?.car_type || "Unknown", // Using car_type instead of model
        name: booking.cars?.name || "Unknown",
      }));

      return formattedBookings;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setError(`Failed to fetch bookings: ${error.message || error}`);
      return [];
    }
  };

  const checkIfUserIsAdmin = async (userId) => {
    try {
      // Check if user has admin role in the users table
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Admin check error:", error);
        throw error;
      }

      return data?.role === "admin";
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError);
        throw authError;
      }

      if (!user) {
        throw new Error("No user logged in");
      }

      // Check if user is admin
      const adminStatus = await checkIfUserIsAdmin(user.id);
      setIsAdmin(adminStatus);

      // Fetch bookings based on user role
      let bookingsData;
      if (adminStatus) {
        // Admin sees all bookings
        bookingsData = await fetchAllBookings();
      } else {
        // Regular user sees only their bookings
        bookingsData = await fetchUserBookings(user.id);
      }

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error in loadBookings:", error);
      setError(`Failed to load bookings: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus, carId = null) => {
    try {
      // Update booking status
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (bookingError) {
        console.error("Error updating booking:", bookingError);
        throw bookingError;
      }

      // Update car status based on booking status
      if (carId) {
        try {
          let carUpdate = {};

          if (newStatus === "Completed") {
            carUpdate = {
              available: true,
              status: "Available",
            };
          } else if (newStatus === "Active") {
            carUpdate = {
              available: false,
              status: "Booked",
            };
          } else if (newStatus === "Cancelled") {
            carUpdate = {
              available: true,
              status: "Available",
            };
          } else if (newStatus === "Pending") {
            carUpdate = {
              available: false,
              status: "Pending",
            };
          }

          // Update car status in database
          const { error: carError } = await supabase
            .from("cars")
            .update(carUpdate)
            .eq("id", carId);

          if (carError) {
            console.error("Error updating car status:", carError);
            throw carError;
          }
        } catch (carError) {
          console.error("Failed to update car status:", carError);
          setError(
            `Failed to update car status: ${carError.message || carError}`
          );
        }
      }

      // Refresh the list after updating
      await loadBookings();
    } catch (error) {
      console.error("Failed to update booking status:", error);
      setError(`Failed to update booking: ${error.message || error}`);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Filter bookings to exclude completed ones unless showCompleted is true
  const filteredBookings = bookings.filter((booking) =>
    showCompleted ? true : booking.status !== "Completed"
  );

  if (loading) {
    return (
      <div className="w-full dark:bg-gray-800 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full dark:bg-gray-800 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="mr-4">
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-2xl font-bold dark:text-white">
            {isAdmin ? "All Car Bookings" : "My Car Bookings"}
          </h2>
        </div>
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="mr-2 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Show completed bookings
            </span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700/50 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Car ID</th>
                <th className="py-3 px-6 text-left">Car</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-left">Pickup Date</th>
                <th className="py-3 px-6 text-left">Return Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-right">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr
                    key={booking.id || index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-6 text-left">{booking.car_id}</td>
                    <td className="py-3 px-6 text-left">
                      <div>
                        <p className="font-medium dark:text-white">
                          {booking.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {booking.carName}{" "}
                          {booking.cars?.year && `(${booking.cars.year})`}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{booking.user_name}</td>
                    <td className="py-3 px-6 text-left">{booking.user_id}</td>
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
                                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                    : booking.status === "Completed"
                                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                    : booking.status === "Cancelled"
                                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right dark:text-white">
                      {booking.total_price}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center space-x-2">
                          {/* Confirm Button */}
                          <button
                            className={`text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 ${
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
                            className={`text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ${
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
                            className={`text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 ${
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
                            className={`text-purple-600 dark:text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 ${
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
                  <td
                    colSpan="9"
                    className="py-4 text-center text-gray-600 dark:text-gray-400"
                  >
                    No bookings found
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
