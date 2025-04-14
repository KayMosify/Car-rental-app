import React from "react";
import AdminSidebar from "./AdminSidebar";
import DashboardContent from "../../components/Admin/Dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* <AdminSidebar /> */}

        {/* dashboard */}

        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
