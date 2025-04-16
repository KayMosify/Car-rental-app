import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaCar } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  getCountries,
  getRegionsByCountry,
} from "../../../utils/supabase"; // Update with the correct path to your supabase.js file

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "Male",
    country: "",
    region: "",
    city: "",
    streetAddress: "",
    photoURL: "",
  });

  // Fetch countries when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);

        // Set default country if user doesn't have one and countries are loaded
        if (
          countriesData.length > 0 &&
          (!profileData.country || profileData.country === "")
        ) {
          setProfileData((prev) => ({
            ...prev,
            country: countriesData[0].id.toString(), // Assuming id is numeric, convert to string for form value
          }));

          // Fetch regions for default country
          fetchRegionsForCountry(countriesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load countries");
      }
    };

    fetchCountries();
  }, []);

  // Fetch regions when country changes
  const fetchRegionsForCountry = async (countryId) => {
    try {
      const regionsData = await getRegionsByCountry(countryId);
      setRegions(regionsData);
    } catch (error) {
      console.error("Error fetching regions:", error);
      toast.error("Failed to load regions");
      setRegions([]);
    }
  };

  useEffect(() => {
    if (user) {
      // Set initial data from user object
      setProfileData({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "Male",
        country: user.country || "",
        region: user.region || "",
        city: user.city || "",
        streetAddress: user.streetAddress || "",
        photoURL: user.photoURL || "",
      });

      // If user has a country selected, fetch regions for that country
      if (user.country) {
        fetchRegionsForCountry(user.country);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If country changed, fetch regions for the new country
    if (name === "country" && value) {
      fetchRegionsForCountry(value);

      // Reset region when country changes
      setProfileData((prev) => ({
        ...prev,
        region: "",
      }));
    }
  };

  const handleGenderChange = (gender) => {
    setProfileData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(profileData);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageLoading(true);

    try {
      // Convert the file to base64 string or upload to storage service
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        // In a real app, you would upload this to your storage service
        // For now, we'll just use the base64 string
        const photoURL = reader.result;

        setProfileData((prev) => ({
          ...prev,
          photoURL,
        }));

        // Update in the backend
        await updateUserProfile({ ...profileData, photoURL });
        toast.success("Profile picture updated successfully");
        setImageLoading(false);
      };
      reader.onerror = () => {
        toast.error("Error reading file");
        setImageLoading(false);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      setImageLoading(false);
    }
  };

  // Generate initials from user's name
  const getInitials = () => {
    if (profileData.firstName) {
      return profileData.firstName.charAt(0).toUpperCase();
    }
    if (profileData.email) {
      return profileData.email.charAt(0).toUpperCase();
    }
    return "U"; // Default if no name or email
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Not Authorized
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - hidden on mobile, shown on md and up */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6 bg-blue-400 dark:bg-blue-600 text-white font-bold text-lg">
          My Account
        </div>
        <nav className="p-4">
          <Link
            to="/cars"
            className="flex items-center p-3 mb-2 gap-2 hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-3 mb-2 gap-2 hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-3 mb-2 hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded"
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
            className="flex items-center p-3 hover:text-blue-700 dark:hover:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded"
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

      {/* Mobile navigation - visible only on small screens */}
      <div className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">My Account</h1>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2">
          <Link
            to="/cars"
            className="flex items-center p-2 gap-2 bg-blue-50 dark:bg-blue-900/50 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 rounded whitespace-nowrap"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-2 gap-2 bg-blue-50 dark:bg-blue-900/50 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 rounded whitespace-nowrap"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/50 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 rounded whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/50 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 rounded whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-white mb-4 md:mb-6">
          Profile Details
        </h2>

        <div className="flex flex-col md:flex-row mb-6 md:mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.photoURL ? (
              <img
                src={profileData.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {getInitials()}
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            disabled={imageLoading}
            className="mt-4 px-4 py-2 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors duration-200 flex items-center justify-center"
          >
            {imageLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  placeholder="Your firstname"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  placeholder="Your lastname"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+233 557869685"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <div className="flex flex-wrap space-x-0 space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => handleGenderChange("Male")}
                  className={`px-4 py-1 rounded mb-2 sm:mb-0 ${
                    profileData.gender === "Male"
                      ? "bg-blue-500 dark:bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange("Female")}
                  className={`px-4 py-1 rounded ${
                    profileData.gender === "Female"
                      ? "bg-blue-500 dark:bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange("Other")}
                  className={`px-4 py-1 rounded ${
                    profileData.gender === "Other"
                      ? "bg-blue-500 dark:bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Other
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Country</label>
                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Region</label>
                  <select
                    name="region"
                    value={profileData.region}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={!profileData.country || regions.length === 0}
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  placeholder="Achimota"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={profileData.streetAddress}
                  onChange={handleChange}
                  placeholder="Elegant Quarters, No.1 Street"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
