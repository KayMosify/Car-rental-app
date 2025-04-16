import React from "react";
import AdminSidebar from "./AdminSidebar";
import Bookings from "../../components/Admin/Bookings/Bookings";

const AdminBookings = () => {
  console.log("AdminBookings component rendered");

  return (
    <div>
      <div className="flex gap-4">
        {/* <AdminSidebar /> */}

        <Bookings />
      </div>
    </div>
  );
};

export default AdminBookings;
