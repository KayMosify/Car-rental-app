import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const {
    wishlistItems,
    toggleWishlistItem,
    showWishlist,
    toggleWishlistDisplay,
    clearWishlist,
  } = useWishlist();

  if (!showWishlist) return null;

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
          My Wishlist ({wishlistItems.length})
        </h3>
        <div className="flex space-x-2">
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              title="Clear all"
            >
              <FaTrash size={14} />
            </button>
          )}
          <button
            onClick={toggleWishlistDisplay}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {wishlistItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Your wishlist is empty
          </div>
        ) : (
          <ul>
            {wishlistItems.map((car) => (
              <li
                key={car.id}
                className="p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={car.image_url || "placeholder.jpg"}
                      alt={car.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => (e.target.src = "placeholder.jpg")}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/cars/${car.id}`}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                      onClick={toggleWishlistDisplay}
                    >
                      {car.name}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ${car.price_per_day?.toFixed(2)}/day
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWishlistItem(car)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove from wishlist"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/cars"
          className="block w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={toggleWishlistDisplay}
        >
          Browse more cars
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
