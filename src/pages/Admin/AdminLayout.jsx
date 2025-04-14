// AdminLayout.jsx - Create this wrapper component to manage the sidebar state
import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaBars } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { useTheme } from "../../context/ThemeContext";

const AdminLayout = ({ children }) => {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex  h-screen bg-gray-100 relative">
          {/* Backdrop for mobile - closes sidebar when clicking outside */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transform fixed z-20 inset-y-0 left-0 transition duration-300 ease-in-out lg:relative lg:translate-x-0`}
          >
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              {/* Hamburger button */}
              <button
                className="lg:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <FaBars className="text-gray-700" />
              </button>

              {/* Main content with proper padding for hamburger on mobile */}
              <div className="lg:ml-0 mt-12 lg:mt-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
