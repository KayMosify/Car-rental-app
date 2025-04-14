import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "../../utils/auth";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const ADMIN_CODE = "ADMIN123"; // Replace with secure value from env in production

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Sign up the user with admin role and admin code
      await signUp({
        email,
        password,
        full_name: "Admin User", // Or get from a form field
        role: "admin",
        avatar: null,
        adminCode,
      });

      // Wait briefly for the user to be available
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true); // Set success to true on successful signup
    } catch (error) {
      console.error("Admin signup error:", error);
      setError(error.message || "Failed to create admin account.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Admin account created! Please verify your email.", {
        position: "bottom-right",
        autoClose: 5000,
      });
      navigate("/admin/dashboard"); // Redirect to admin login page
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create Admin Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign up as an administrator to manage the car rental system
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black dark:text-gray-300">
              Admin Code
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
            />
          </div>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md transition duration-150 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Admin Account"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
