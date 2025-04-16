// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import UserDashboard from "./pages/UserDashboard";
// import VendorDashboard from "./pages/VendorDashboard";
// import CarListing from "./pages/CarListing";
// import CarDetails from "./pages/CarDetails";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { ThemeProvider } from "./context/ThemeContext";
// // import InsertCars from "./pages/InsertCars";
// import CarRentalForm from "./pages/CarRentalForm";
// import Dashboard from "./pages/Admin/Dashboard";
// import AdminCarRent from "./pages/Admin/AdminBookings";
// import AdminCars from "./pages/Admin/AdminCars";
// import AdminBookings from "./pages/Admin/AdminBookings";
// import { Toaster } from "react-hot-toast";
// import ProfilePage from "./components/User/Profile/ProfilePage";
// import BookingsPage from "./components/User/Bookings/BookingsPage";
// import CategoriesPage from "./pages/CategoriesPage";
// import AdminSignup from "./pages/Admin/AdminSignup";
// import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
// import SignUpForm from "./pages/Signup";

// // Protected Route component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { user, userProfile, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile?.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <Router>
//           <Toaster position="top-center" />
//           <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-grow">
//               <Routes>
//                 {/* Public routes */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignUpForm />} />
//                 <Route path="/cars" element={<CarListing />} />
//                 <Route path="/categories" element={<CategoriesPage />} />
//                 <Route path="/cars/:carId" element={<CarDetails />} />
//                 {/* <Route path="/create" element={<InsertCars />} /> */}
//                 <Route path="/rent/:carId" element={<CarRentalForm />} />
//                 <Route path="/admin/register" element={<AdminSignup />} />

//                 {/* Protected User Dashboard route */}
//                 <Route
//                   path="/admin/dashboard"
//                   element={
//                     <ProtectedAdminRoute allowedRoles={["admin"]}>
//                       <Dashboard />
//                     </ProtectedAdminRoute>
//                   }
//                 />
//                 <Route
//                   path="/admin/cars"
//                   element={
//                     <ProtectedAdminRoute allowedRoles={["admin"]}>
//                       <AdminCars />
//                     </ProtectedAdminRoute>
//                   }
//                 />
//                 <Route
//                   path="/admin/bookings"
//                   element={
//                     <ProtectedAdminRoute allowedRoles={["admin"]}>
//                       <AdminBookings />
//                     </ProtectedAdminRoute>
//                   }
//                 />

//                 <Route path="/user/profile" element={<ProfilePage />} />
//                 <Route path="/user/bookings" element={<BookingsPage />} />

//                 {/* Protected User Dashboard route */}
//                 <Route
//                   path="/user/profile"
//                   element={
//                     <ProtectedRoute allowedRoles={["user"]}>
//                       <ProfilePage />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/user/bookings"
//                   element={
//                     <ProtectedRoute allowedRoles={["user"]}>
//                       <BookingsPage />
//                     </ProtectedRoute>
//                   }
//                 />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
// import CarRentalForm from "./pages/CarRentalForm";
import Dashboard from "./pages/Admin/Dashboard";
import AdminCarRent from "./pages/Admin/AdminBookings";
import AdminCars from "./pages/Admin/AdminCars";
import AdminBookings from "./pages/Admin/AdminBookings";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./components/User/Profile/ProfilePage";
import BookingsPage from "./components/User/Bookings/BookingsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AdminSignup from "./pages/Admin/AdminSignup";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import SignUpForm from "./pages/Signup";
import AdminLayout from "./pages/Admin/AdminLayout";
import { WishlistProvider } from "./context/WishlistContext";
import BookingForm from "./components/BookingForm";

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile?.role)) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

// Updated ProtectedAdminRoute with AdminLayout
const ProtectedAdminRouteWithLayout = ({ children, allowedRoles }) => {
  return (
    <ProtectedAdminRoute allowedRoles={allowedRoles}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedAdminRoute>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WishlistProvider>
          <Router>
            <Toaster position="top-center" />
            <div className="min-h-screen flex flex-col">
              <Routes>
                {/* Admin routes with AdminLayout */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedAdminRouteWithLayout allowedRoles={["admin"]}>
                      <Dashboard />
                    </ProtectedAdminRouteWithLayout>
                  }
                />
                <Route
                  path="/admin/cars"
                  element={
                    <ProtectedAdminRouteWithLayout allowedRoles={["admin"]}>
                      <AdminCars />
                    </ProtectedAdminRouteWithLayout>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={
                    <ProtectedAdminRouteWithLayout allowedRoles={["admin"]}>
                      <AdminBookings />
                    </ProtectedAdminRouteWithLayout>
                  }
                />
                <Route path="/admin/register" element={<AdminSignup />} />

                {/* Regular routes with Navbar and Footer */}
                <Route
                  path="*"
                  element={
                    <>
                      <Navbar />
                      <main className="flex-grow w-full">
                        <Routes>
                          {/* Public routes */}
                          <Route path="/" element={<Home />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<SignUpForm />} />
                          <Route path="/cars" element={<CarListing />} />
                          <Route
                            path="/categories"
                            element={<CategoriesPage />}
                          />
                          <Route path="/cars/:carId" element={<CarDetails />} />
                          <Route path="/rent/:carId" element={<BookingForm />}
                          />

                          {/* Protected User routes */}
                          <Route
                            path="/user/profile"
                            element={
                              <ProtectedRoute allowedRoles={["user"]}>
                                <ProfilePage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/user/bookings"
                            element={
                              <ProtectedRoute allowedRoles={["user"]}>
                                <BookingsPage />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
