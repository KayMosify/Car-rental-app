import React, { useState } from "react";
import { signUp } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp({
        email,
        password,
        full_name: fullName,
        role: "user",
        avatar: null,
      });
      setSuccess(true); // Set success to true on successful signup
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed: ", error);
      setError(error.message);

      if (error.message.includes("duplicate key")) {
        toast.error("Email already in use");
      } else if (error.message.includes("password")) {
        toast.error("Invalid password");
      } else {
        toast.error("Signup failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      // Show success message and redirect to login
      toast.success("Account created successfully! Please log in.");
      navigate("/login"); // Redirect to login page after signup
    }
  }, [success, navigate]);

  return (
    <form onSubmit={handleSubmit} className="max-w-[30rem] mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Create Account
      </h2>

      <div className="mb-4">
        <label className="block text-black dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-black dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-black dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </div>

      <div className="mb-6">
        <label className="block text-black dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength="6"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Creating account...
          </span>
        ) : (
          "Sign Up"
        )}
      </button>

      <div className="mt-4 text-center dark:text-gray-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
