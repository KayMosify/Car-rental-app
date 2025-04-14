import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("Rendering: Loading state");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    console.log("Rendering: Redirect to login (no user)");
    return <Navigate to="/login" replace />;
  }

  // if (userProfile === null) {
  //   console.log("Rendering: Loading profile state");
  //   return (
  //     <div className="text-center mt-10 text-red-600">
  //       Error: User profile not found. Please contact support.
  //     </div>
  //   );
  // }

  if (user?.role !== "admin") {
    console.log("Rendering: Unauthorized message");
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Unauthorized - Admin access only
      </div>
    );
  }

  console.log("Rendering: Children (admin page)");
  return children;
};

export default ProtectedAdminRoute;
