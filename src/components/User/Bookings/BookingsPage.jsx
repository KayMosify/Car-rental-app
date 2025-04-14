// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import { FaCar } from "react-icons/fa6";
// import { BiSolidCategoryAlt } from "react-icons/bi";

// const BookingsPage = () => {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // This would normally fetch from your backend
//     // Simulating API call with setTimeout
//     const fetchBookings = async () => {
//       try {
//         // Replace with actual API call
//         setTimeout(() => {
//           // Sample data based on your image
//           const sampleBookings = [
//             {
//               id: 1,
//               dateBooked: "Oct 12, 2023",
//               car: "Toyota Camry",
//               pickupDate: "Oct 13, 2023",
//               returnDate: "Oct 27, 2023",
//               price: "GH₵ 350",
//               status: "PENDING",
//             },
//           ];
//           setBookings(sampleBookings);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchBookings();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Not Authorized
//           </h2>
//           <p className="text-gray-600">Please log in to view your bookings.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-6 bg-blue-400 text-white font-bold text-lg">
//           My Account
//         </div>
//         <nav className="p-4">
//           <Link
//             to="/cars"
//             className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
//           >
//             <FaCar />
//             Cars
//           </Link>
//           <Link
//             to="/categories"
//             className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
//           >
//             <BiSolidCategoryAlt />
//             Categories
//           </Link>
//           <Link
//             to="/user/profile"
//             className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             Profile
//           </Link>

//           <Link
//             to="/user/bookings"
//             className="flex items-center p-3 mb-2 bg-gray-100 text-gray-700 rounded"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
//               <path
//                 fillRule="evenodd"
//                 d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             Bookings
//           </Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//           My Bookings ({bookings.length})
//         </h2>

//         {loading ? (
//           <div className="flex justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : bookings.length > 0 ? (
//           <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date Booked
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Car
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Pickup Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Return Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {booking.dateBooked}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <span className="ml-2 text-sm text-gray-900">
//                           🚗 {booking.car}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {booking.pickupDate}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {booking.returnDate}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
//                       {booking.price}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                         {booking.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <div className="text-gray-500 mb-4">
//               <svg
//                 className="h-16 w-16 mx-auto text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1}
//                   d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No Bookings Found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               You haven't made any bookings yet.
//             </p>
//             <Link
//               to="/cars"
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Browse Cars
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaCar } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { getBookings } from "../../../utils/supabase";

const BookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 bg-blue-400 text-white font-bold text-lg">
          My Account
        </div>
        <nav className="p-4">
          <Link
            to="/cars"
            className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded"
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
            className="flex items-center p-3 mb-2 bg-gray-100 text-gray-700 rounded"
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          My Bookings ({bookings.length})
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Booked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(booking.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm text-gray-900">
                          🚗 {booking.carName || booking.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.pickup_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.dropoff_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      $ {booking.total_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
              No Bookings Found
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't made any bookings yet.
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
