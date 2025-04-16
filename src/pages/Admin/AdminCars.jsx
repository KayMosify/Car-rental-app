// import React from "react";
// import AdminSidebar from "./AdminSidebar";
// import AllCars from "../../components/Admin/Cars/AllCars";

// const AdminCars = () => {
//   console.log("AdminCars component rendered");
//   return (
//     <div>
//       <div className="flex gap-4">
//         <AdminSidebar />

//         <AllCars />
//       </div>
//     </div>
//   );
// };

// export default AdminCars;

import React from "react";
import AdminSidebar from "./AdminSidebar";
import AllCars from "../../components/Admin/Cars/AllCars";

const AdminCars = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* <AdminSidebar /> */}
        <div className="flex-1 dark:bg-gray-700">
          <div className="py-6 dark:bg-gray-700">
            <AllCars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
