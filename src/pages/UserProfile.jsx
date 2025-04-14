import React from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.displayName || "User Name"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {user?.displayName || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {user?.email || "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
