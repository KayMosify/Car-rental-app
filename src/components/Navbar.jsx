import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import Logo from "../assets/Logo.png";
import HeartIcon from "../assets/heart.png";
import BellIcon from "../assets/notification.png";
import SettingsIcon from "../assets/setting.png";
import FilterIcon from "../assets/filter.png";
import { toast } from "react-hot-toast";
import Wishlist from "./Wishlist";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlistItems, toggleWishlistDisplay } = useWishlist();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout();
      toast.success("Logged out successfully");
      setShowDropdown(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
      console.error("Error signing out:", error);
    }
  };

  const handleNavigation = (path, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowDropdown(false);
    setIsMenuOpen(false);
    navigate(path);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".dropdown-menu")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown]);

  // Generate initials from user's name
  const getInitials = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U"; // Default if no name or email
  };

  const renderProfileImage = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="User Profile"
          className="h-8 w-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
        />
      );
    } else {
      return (
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:ring-2 hover:ring-blue-500">
          {getInitials()}
        </div>
      );
    }
  };

  const renderAuthSection = () => {
    if (isAuthenticated) {
      return (
        <div className="relative z-[9999]" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User menu"
          >
            {renderProfileImage()}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-[9999] pointer-events-auto dropdown-menu">
              <button
                onClick={(e) => handleNavigation("/user/profile", e)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Profile
              </button>
              <button
                onClick={(e) => handleNavigation("/user/bookings", e)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Bookings
              </button>
              <button
                onClick={(e) => handleNavigation("/admin/dashboard", e)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }
    return (
      <Link
        to="/login"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md"
      >
        Login
      </Link>
    );
  };

  return (
    <nav className="z-[9999] relative pointer-events-auto bg-white dark:bg-gray-800 shadow-lg">
      {/* Desktop View */}
      <div className="hidden md:block max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="MORENT Logo" className="h-8 mr-36" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search something here"
                className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={FilterIcon} alt="Filter" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 z-30">
            <div className="flex items-center space-x-4 relative z-10">
              <div className="relative z-10">
                <button
                  className="p-2 relative"
                  onClick={toggleWishlistDisplay}
                  aria-label="Wishlist"
                >
                  <img src={HeartIcon} alt="Favorites" className="h-6 w-6" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                <Wishlist />
              </div>

              <div className="relative z-10">
                <button className="p-2 relative">
                  <img src={BellIcon} alt="Notifications" className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full"></span>
                </button>
              </div>

              <div className="relative z-10">
                <button className="p-2">
                  <img src={SettingsIcon} alt="Settings" className="h-6 w-6" />
                </button>
              </div>

              <div className="relative z-50">{renderAuthSection()}</div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none z-40 relative"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View - Redesigned to match Image 2 */}
      <div className="md:hidden">
        {/* Top bar with hamburger menu, logo, and profile */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center justify-center">
            <Link to="/">
              <h1 className="text-blue-600 font-bold text-2xl">MORENT</h1>
            </Link>
          </div>

          <div className="flex items-center">{renderAuthSection()}</div>
        </div>

        {/* Search Bar - Moved below top bar in mobile view */}
        <div className="px-4 py-2">
          <div className="relative w-full">
            <div className="flex items-center">
              <div className="relative flex-1 mr-2">
                <input
                  type="text"
                  placeholder="Search something here"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <img src={FilterIcon} alt="Filter" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <Wishlist />

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
            <Link
              to="/cars"
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Cars
            </Link>

            <div className="block px-3 py-2 rounded-md">
              <button
                onClick={toggleWishlistDisplay}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
              >
                <img src={HeartIcon} alt="Favorites" className="h-5 w-5" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            </div>

            {isAuthenticated ? (
              <>
                <button
                  onClick={(e) => handleNavigation("/user/profile", e)}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={(e) => handleNavigation("/user/bookings", e)}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Bookings
                </button>
                <button
                  onClick={(e) => handleNavigation("/admin/dashboard", e)}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
