// import BookingForm from "../components/BookingForm";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   checkCarAvailability,
//   createBooking,
//   supabase,
// } from "../utils/supabase";
// import { useNavigate } from "react-router-dom";
// import BookingConfirmationModal from "../components/BookingConfirmationModal";
// import { useAuth } from "../context/AuthContext";

// const CarRentalForm = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     townCity: "",
//     pickUpLocation: "",
//     pickUpDate: "",
//     pickUpTime: "",
//     dropOffLocation: "",
//     dropOffDate: "",
//     dropOffTime: "",
//   });

//   const [car, setCar] = useState(null); // State to store car data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [submitting, setSubmitting] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();
//   const { carId } = useParams();
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [bookingId, setBookingId] = useState(null);
//   const { user } = useAuth();

//   // Fetch car data when component mounts
//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("cars")
//           .select("*")
//           .eq("id", carId)
//           .single();

//         if (error) throw error;
//         setCar(data);
//         setTotalPrice(data.price_per_day); // Initialize with base price
//       } catch (error) {
//         console.error("Error fetching car:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [carId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Recalculate price if promo code changes
//     if (name === "promoCode") {
//       applyPromoCode(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       // 1. First check car availability (availability and date range)
//       const { available, message } = await checkCarAvailability(
//         carId,
//         formData.pickUpDate,
//         formData.dropOffDate
//       );

//       if (!available) {
//         alert(
//           message || "This car is no longer available for the selected dates."
//         );
//         return;
//       }

//       // 2. Create the booking if the car is available
//       const bookingData = {
//         car_id: carId,
//         user_id: user.id,
//         user_name: formData.name,
//         user_phone: formData.phone,
//         user_address: `${formData.address}, ${formData.townCity}`,
//         pickup_location: formData.pickUpLocation,
//         pickup_date: formData.pickUpDate,
//         pickup_time: formData.pickUpTime,
//         dropoff_location: formData.dropOffLocation,
//         dropoff_date: formData.dropOffDate,
//         dropoff_time: formData.dropOffTime,
//         total_price: totalPrice,
//         status: "pending",
//       };

//       await createBooking(bookingData); // Returns the inserted booking

//       // 3. Update car availability after successful booking
//       await supabase.from("cars").update({ available: false }).eq("id", carId);
//       alert("Booking successful!");

//       // 4. Redirect to confirmation page
//       // navigate(`/booking-confirmation/${booking[0].id}`);
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(
//         `Failed to complete booking. ${error.message || "Please try again."}`
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!car) return <div>Car not found</div>;

//   return (
//     <div className="flex justify-between p-5 bg-gray-100 font-sans">
//       <form action="" onSubmit={handleSubmit}>
//         {/* Left Section: Billing and Rental Info */}
//         <div className="flex-1">
//           <div id="booking-form">
//             <BookingForm
//               formData={formData}
//               handleChange={handleChange}
//               onSubmit={handleSubmit}
//               isSubmitting={submitting}
//             />
//           </div>
//         </div>

//         {/* Right Section: Rental Summary */}
//         <div className="flex-2 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-lg font-bold mb-2">RENTAL SUMMARY</h2>
//           <p className="text-xs text-gray-500 mb-5">
//             Prices may change depending on the length of the rental and the
//             price of your rental car.
//           </p>
//           <div className="flex items-center mb-5">
//             <img
//               src={car.image_url || "https://via.placeholder.com/150"}
//               alt={car.name || "Car image"}
//               className="w-24 h-14 mr-4"
//             />
//             <div>
//               <h3 className="text-lg font-bold">{car.name}</h3>
//               <div className="text-xs text-gray-500">
//                 <span>★★★★★</span> 440+ Reviewer
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between text-sm mb-2">
//             <span>Subtotal</span>
//             <span>${car.price_per_day?.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-sm mb-5">
//             <span>Tax</span>
//             <span>$0</span>
//           </div>
//           <div className="flex justify-between mb-5">
//             <button className="p-2 bg-blue-600 text-white rounded-md">
//               {submitting ? "Applying..." : "Apply Now"}{" "}
//             </button>
//           </div>
//           <div className="flex justify-between text-base font-bold mb-2">
//             <span>TOTAL RENTAL PRICE</span>
//             <span className="text-xl text-blue-600">
//               ${totalPrice.toFixed(2)}
//             </span>
//           </div>
//           <p className="text-xs text-gray-500">
//             Overall price and includes rental discount
//           </p>
//         </div>
//       </form>
//       {/* Existing content */}
//       {showConfirmation && (
//         <BookingConfirmationModal
//           bookingId={bookingId}
//           onClose={() => setShowConfirmation(false)}
//         />
//       )}
//     </div>
//   );
// };
// export default CarRentalForm;
