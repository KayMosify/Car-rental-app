import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add or remove car from wishlist
  const toggleWishlistItem = (car) => {
    setWishlistItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === car.id
      );

      if (existingItemIndex >= 0) {
        // Remove the item if it already exists
        return prevItems.filter((item) => item.id !== car.id);
      } else {
        // Add the item if it doesn't exist
        return [...prevItems, car];
      }
    });
  };

  // Check if a car is in the wishlist
  const isInWishlist = (carId) => {
    return wishlistItems.some((item) => item.id === carId);
  };

  // Toggle wishlist dropdown visibility
  const toggleWishlistDisplay = () => {
    setShowWishlist((prev) => !prev);
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    toggleWishlistItem,
    isInWishlist,
    showWishlist,
    toggleWishlistDisplay,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
