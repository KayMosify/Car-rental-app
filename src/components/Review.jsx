import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const Review = ({ carId, onReviewSubmit, reviews = [] }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await onReviewSubmit({
        carId,
        userId: user.id,
        rating,
        comment,
        userName: user.email.split("@")[0], // Using email username as display name
        createdAt: new Date().toISOString(),
      });
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Reviews ({reviews.length})
      </h3>

      {/* Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-2xl ${
                      ratingValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this car..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || !comment.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting || rating === 0 || !comment.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {review.userName[0].toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No reviews yet. Be the first to review this car!
          </p>
        )}
      </div>
    </div>
  );
};

export default Review;
