import React from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmationModal = ({ show, bookingId, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleClose = () => {
    onClose();
    navigate(`/user/bookings`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-500 mb-3">
          Booking Confirmed!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Your booking ID is: <span className="font-bold">{bookingId}</span>
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          We've sent your details to your email.
        </p>
        <button
          onClick={handleClose}
          className="mt-5 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          Go to Booking Details
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
