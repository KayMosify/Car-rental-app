import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Show loading toast that will be dismissed when login completes
    const loadingToast = toast.loading("Logging in...");

    try {
      // Use the login function from AuthContext
      await login(email, password);

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("Login successful!");

      // Add a slight delay before redirecting for better UX
      setTimeout(() => {
        navigate("/"); // Redirect to home page after successful login
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error("Failed to sign in. Please check your credentials.");

      setError(
        error.message || "Failed to sign in. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              create a new account
            </Link>
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
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Forgot your password?
            </Link>
            <div className="signup-links">
              <div className="signup-option dark:text-gray-300">
                <span className="mr-2">Don't have an account?</span>
                <Link to="/signup" className="signup-btn hover:text-blue-800">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
