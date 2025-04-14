import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaCar } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "Male",
    country: "Ghana",
    region: "",
    city: "",
    streetAddress: "",
    photoURL: "",
  });

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
        country: user.country || "Ghana",
        region: user.region || "",
        city: user.city || "",
        streetAddress: user.streetAddress || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Not Authorized
          </h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 bg-blue-400 text-white font-bold text-lg">
          My Account
        </div>
        <nav className="p-4">
          <Link
            to="/cars"
            className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
          >
            <FaCar />
            Cars
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-3 mb-2 gap-2 bg-gray-100 text-gray-700 rounded"
          >
            <BiSolidCategoryAlt />
            Categories
          </Link>
          <Link
            to="/user/profile"
            className="flex items-center p-3 mb-2 bg-gray-100 text-gray-700 rounded"
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
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded"
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Profile Details
        </h2>

        <div className="flex mb-8">
          <div className="mr-8">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
              {profileData.photoURL ? (
                <img
                  src={profileData.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-400"
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
              )}
            </div>
            <button className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
              Upload Image
            </button>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    placeholder="Your firstname"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    placeholder="Your lastname"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+233 557869685"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Gender</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleGenderChange("Male")}
                    className={`px-4 py-1 rounded ${
                      profileData.gender === "Male"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("Female")}
                    className={`px-4 py-1 rounded ${
                      profileData.gender === "Female"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("Other")}
                    className={`px-4 py-1 rounded ${
                      profileData.gender === "Other"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-gray-700 font-medium mb-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={profileData.country}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Region</label>
                    <select
                      name="region"
                      value={profileData.region}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Your Region</option>
                      <option value="Greater Accra">Greater Accra</option>
                      <option value="Ashanti">Ashanti</option>
                      <option value="Western">Western</option>
                      <option value="Eastern">Eastern</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="Achimota"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={profileData.streetAddress}
                    onChange={handleChange}
                    placeholder="Elegant Quarters, No.1 Street"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
