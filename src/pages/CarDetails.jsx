// // CarDetails.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchCarById,
//   fetchRecommendedCars,
//   fetchReviewsByCarId,
//   addReview,
// } from "../utils/supabase"; // Adjust the import path as necessary
// import BookingForm from "../components/BookingForm";
// import CarCard from "../components/CarCard";
// import { FaStar } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function CarDetails() {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [recommendedCars, setRecommendedCars] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({
//     user_name: "",
//     user_title: "",
//     rating: 0,
//     comment: "",
//   });

//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   // Fetch car details and reviews
//   useEffect(() => {
//     async function getCarDetails() {
//       const carData = await fetchCarById(carId);
//       if (carData) {
//         setCar(carData);
//         const recommended = await fetchRecommendedCars(carData.type, carId);
//         setRecommendedCars(recommended);
//       }
//     }
//     async function getReviews() {
//       const reviewsData = await fetchReviewsByCarId(carId);
//       setReviews(reviewsData);
//     }

//     getCarDetails();
//     getReviews();
//   }, [carId]);

//   const handleReviewChange = (e) => {
//     setNewReview({
//       ...newReview,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!newReview.user_name || !newReview.comment || !newReview.rating) {
//       alert("Please fill in all fields!");
//       return;
//     }
//     try {
//       const addedReview = await addReview(carId, user.id, newReview);
//       if (addedReview) {
//         setReviews([...reviews, addedReview]);
//         setNewReview({
//           user_name: "",
//           user_title: "",
//           rating: 0,
//           comment: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   if (!car)
//     return (
//       <div className="text-center p-6 text-gray-900 dark:text-white">
//         Loading...
//       </div>
//     );

//   const mainImage = car.image || "placeholder.jpg";

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-800">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-blue-500 p-6 rounded-lg text-white">
//           <h1 className="text-3xl font-bold mb-4">
//             {car.type} car with the best design
//           </h1>
//           <img
//             src={car?.image_url}
//             alt={car.model}
//             className=" mb-4"
//             onError={(e) => (e.target.src = "placeholder.jpg")}
//           />
//         </div>
//         <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               {car.model}
//             </h1>
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} className="text-yellow-400" />
//               ))}
//             </div>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             {car?.description}
//           </p>
//           <p className="text-2xl font-bold text-gray-900 dark:text-white">
//             ${car.price_per_day.toFixed(2)}/day
//           </p>
//           <button
//             onClick={() =>
//               user
//                 ? navigate(`/rent/${car.id}`)
//                 : navigate("/login", { state: { from: `/cars/${car.id}` } })
//             }
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
//           >
//             Rent Now
//           </button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//           Reviews ({reviews.length})
//         </h2>
//         {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div
//               key={review.id}
//               className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
//                   <div>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {review.user_name}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       {review.user_title}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {new Date(review.review_date).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="flex mb-2">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <FaStar key={i} className="text-yellow-400" />
//                 ))}
//               </div>
//               <p className="text-gray-600 dark:text-gray-300">
//                 {review.comment}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
//         )}

//         {/* Add Review Form */}
//         {user ? (
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//               Add a Review
//             </h3>
//             <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
//               <div>
//                 <label
//                   className="block text-sm text-gray-700 dark:text-gray-300"
//                   htmlFor="user_name"
//                 >
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="user_name"
//                   name="user_name"
//                   value={newReview.user_name}
//                   onChange={handleReviewChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   className="block text-sm text-gray-700 dark:text-gray-300"
//                   htmlFor="user_title"
//                 >
//                   Your Title
//                 </label>
//                 <input
//                   type="text"
//                   id="user_title"
//                   name="user_title"
//                   value={newReview.user_title}
//                   onChange={handleReviewChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label
//                   className="block text-sm text-gray-700 dark:text-gray-300"
//                   htmlFor="rating"
//                 >
//                   Rating
//                 </label>
//                 <input
//                   type="number"
//                   id="rating"
//                   name="rating"
//                   value={newReview.rating}
//                   onChange={handleReviewChange}
//                   max="5"
//                   min="1"
//                   className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   className="block text-sm text-gray-700 dark:text-gray-300"
//                   htmlFor="comment"
//                 >
//                   Your Review
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   value={newReview.comment}
//                   onChange={handleReviewChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400">
//             You need to be logged in to add a review.
//           </p>
//         )}
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//           Recommended Cars
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recommendedCars.length > 0 ? (
//             recommendedCars.map((car) => <CarCard key={car.id} car={car} />)
//           ) : (
//             <p className="text-gray-500 dark:text-gray-400">
//               No recommended cars available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarDetails;

// CarDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCarById,
  getRecommendedCars,
  fetchReviewsByCarId,
  addReview,
} from "../utils/supabase"; // Adjust the import path as necessary
import BookingForm from "../components/BookingForm";
import CarCard from "../components/CarCard";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CarDetails() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user_name: "",
    user_title: "",
    rating: 0,
    comment: "",
  });
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch car details and reviews
  useEffect(() => {
    async function getCarDetails() {
      const carData = await fetchCarById(carId);
      if (carData) {
        setCar(carData);
        const recommended = await getRecommendedCars(carData.type, carId);
        setRecommendedCars(recommended);
      }
    }
    async function getReviews() {
      const reviewsData = await fetchReviewsByCarId(carId);
      setReviews(reviewsData);
    }

    getCarDetails();
    getReviews();
  }, [carId]);

  const handleReviewChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.user_name || !newReview.comment || !newReview.rating) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const addedReview = await addReview(carId, user.id, newReview);
      if (addedReview) {
        setReviews([...reviews, addedReview]);
        setNewReview({
          user_name: "",
          user_title: "",
          rating: 0,
          comment: "",
        });
        setShowReviewFormModal(false); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const openReviewFormModal = () => {
    setShowReviewFormModal(true);
  };

  const closeReviewFormModal = () => {
    setShowReviewFormModal(false);
  };

  if (!car)
    return (
      <div className="text-center p-6 text-gray-900 dark:text-white">
        Loading...
      </div>
    );

  const mainImage = car.image || "placeholder.jpg";

  return (
    <div className=" mx-auto p-6 bg-gray-100 dark:bg-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="bg-blue-500 p-6 rounded-lg text-white">
          <h1 className="text-3xl font-bold mb-4">
            {car.type}Sports car with the best design and acceleration
          </h1>
          <p className="text-lg mb-4">
            Safety and comfort while driving a futuristic and elegant sports car
          </p>
          <img
            src={car?.image_url}
            alt={car.model}
            className="mb-4"
            onError={(e) => (e.target.src = "placeholder.jpg")}
          />
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {car.model}
            </h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {car?.description}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2 ">
              TypeCar{" "}
              <span className="text-black font-medium ml-4">
                {car?.car_type}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Capacity{" "}
              <span className="text-black font-medium ml-4">
                {car?.capacity} Person
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Steering{" "}
              <span className="text-black font-medium ml-4">
                {car?.steering_type}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Gasoline{" "}
              <span className="text-black font-medium ml-4">
                {car?.fuel_capacity}L
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            {" "}
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${car.price_per_day.toFixed(2)}/day
            </p>
            <button
              onClick={() =>
                user
                  ? navigate(`/rent/${car.id}`)
                  : navigate("/login", { state: { from: `/cars/${car.id}` } })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section - Displayed on the page */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Reviews ({reviews.length})
          </h2>
          {user && (
            <button
              onClick={openReviewFormModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add Review
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.user_name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {review.user_title}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(review.review_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
        )}

        {!user && (
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            You need to be logged in to add a review.
          </p>
        )}
      </div>

      {/* Add Review Modal Form */}
      {showReviewFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add a Review for {car.model}
              </h3>
              <button
                onClick={closeReviewFormModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm text-gray-700 dark:text-gray-300"
                  htmlFor="user_name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={newReview.user_name}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-700 dark:text-gray-300"
                  htmlFor="user_title"
                >
                  Your Title
                </label>
                <input
                  type="text"
                  id="user_title"
                  name="user_title"
                  value={newReview.user_title}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-700 dark:text-gray-300"
                  htmlFor="rating"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  max="5"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-700 dark:text-gray-300"
                  htmlFor="comment"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeReviewFormModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recommended Cars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCars.length > 0 ? (
            recommendedCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No recommended cars available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
