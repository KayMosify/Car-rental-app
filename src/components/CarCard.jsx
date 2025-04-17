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
      className={`p-2 sm:p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition relative min-w-0 overflow-hidden ${
        !isAvailable ? "opacity-75" : ""
      }`}
    >
      {/* Availability Badge */}
      {!isAvailable && (
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded z-10">
          <span className="hidden sm:inline">Unavailable</span>
          <span className="sm:hidden">N/A</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-1">
        <div className="overflow-hidden">
          <h2 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white truncate">
            {car?.name}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
            {car?.car_type?.charAt(0).toUpperCase() + car?.car_type?.slice(1)}
          </p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`text-red-500 hover:text-red-600 flex-shrink-0 ${
            !isAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isAvailable}
        >
          <span className="text-xs sm:text-sm md:text-base">
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </span>
        </button>
      </div>

      <div className="relative mt-1 sm:mt-2">
        <img
          src={car?.image_url || "placeholder.jpg"}
          alt={car?.model}
          className={`w-full h-24 sm:h-32 md:h-40 object-contain rounded-t-lg ${
            !isAvailable ? "grayscale" : ""
          }`}
          onError={(e) => (e.target.src = "placeholder.jpg")}
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">
              BOOKED
            </span>
          </div>
        )}
      </div>

      <div className="p-1 sm:p-2 md:p-4">
        <div className="flex justify-between items-center mt-1 sm:mt-2 text-gray-600 dark:text-gray-300 text-[10px] sm:text-sm">
          <div className="flex items-center gap-1">
            <img src={GasolineIcon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{car?.fuel_capacity}L</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={SteeringIcon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{car?.steering_type}</span>
            <span className="sm:hidden">Auto</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={PeopleIcon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="flex gap-0.5">
              {car?.capacity}
              <p className="hidden sm:block">people</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 sm:mt-4 gap-1">
          <p className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 dark:text-white">
            ${car?.price_per_day?.toFixed(2)}
            <span className="text-gray-400 text-[10px] sm:text-xs"> /day</span>
          </p>
          <button
            onClick={handleRentClick}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded text-[10px] sm:text-sm ${
              isAvailable
                ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? (
              <>
                <span className="hidden sm:inline">Rent Now</span>
                <span className="sm:hidden">Rent</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Unavailable</span>
                <span className="sm:hidden">N/A</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
