import React, { useEffect, useState } from "react";
import { refreshCarAvailability, supabase } from "../utils/supabase"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import GasolineIcon from "../assets/gasoline.png";
import SteeringIcon from "../assets/steering.png";
import PeopleIcon from "../assets/profile.png";

function CarCard({ car: initialCarData }) {
  const [car, setCar] = useState(initialCarData);
  const [isAvailable, setIsAvailable] = useState(
    initialCarData?.available || true
  );
  const { user } = useAuth();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(car.id);

  // Check availability on component mount and set up subscription
  useEffect(() => {
    // Initial availability check
    const checkAvailability = async () => {
      try {
        const updatedCar = await refreshCarAvailability(initialCarData.id);
        setCar(updatedCar);
        setIsAvailable(updatedCar.available);
      } catch (error) {
        console.error("Error checking car availability:", error);
      }
    };

    checkAvailability();

    // Set up a subscription to bookings changes
    // Set up a subscription to bookings changes
    const bookingsChannel = supabase
      .channel(`car-bookings-${initialCarData.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
          filter: `car_id=eq.${initialCarData.id}`,
        },
        async () => {
          try {
            // When a booking related to this car changes, refresh the car's availability
            const updatedCar = await refreshCarAvailability(initialCarData.id);
            setCar(updatedCar);
            setIsAvailable(updatedCar.available);
            console.log(
              "Car availability updated from booking change:",
              updatedCar.available
            );
          } catch (error) {
            console.error("Error updating car availability:", error);
          }
        }
      )
      .subscribe();

    // Also subscribe to direct changes to this car in the cars table
    const carsChannel = supabase
      .channel(`car-updates-${initialCarData.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cars",
          filter: `id=eq.${initialCarData.id}`,
        },
        async (payload) => {
          try {
            // When this car is updated directly, update our local state
            const updatedCar = payload.new;
            setCar(updatedCar);
            setIsAvailable(updatedCar.available);
            console.log("Car updated directly:", updatedCar);
          } catch (error) {
            console.error("Error handling car update:", error);
          }
        }
      )
      .subscribe();

    // Clean up subscriptions
    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(carsChannel);
    };
  }, [initialCarData.id]);

  const handleRentClick = () => {
    if (!isAvailable) return; // Prevent action if car is unavailable

    if (!user) {
      navigate("/login", { state: { from: `/cars/${car.id}` } });
    } else {
      navigate(`/cars/${car.id}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleWishlistItem(car);
  };

  return (
    <div
      className={`p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition relative ${
        !isAvailable ? "opacity-75" : ""
      }`}
    >
      {/* Availability Badge */}
      {!isAvailable && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          Unavailable
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {car?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {car?.car_type?.charAt(0).toUpperCase() + car?.car_type?.slice(1)}
          </p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`text-red-500 hover:text-red-600 ${
            !isAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isAvailable}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="relative">
        <img
          src={car?.image_url || "placeholder.jpg"}
          alt={car?.model}
          className={`w-full h-40 object-contain rounded-t-lg ${
            !isAvailable ? "grayscale" : ""
          }`}
          onError={(e) => (e.target.src = "placeholder.jpg")}
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white font-bold">BOOKED</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mt-2 text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <img src={GasolineIcon} alt="" />
            <span>{car?.fuel_capacity}L</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={SteeringIcon} alt="" />
            <span>{car?.steering_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={PeopleIcon} alt="" />
            <span className="flex gap-1">
              {car?.capacity}
              <p>people</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${car?.price_per_day?.toFixed(2)}
            <span className="text-gray-400"> /day</span>
          </p>
          <button
            onClick={handleRentClick}
            className={`px-4 py-2 rounded ${
              isAvailable
                ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? "Rent Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
