import { getCars, deleteCar } from "../../../utils/supabase";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheck, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddCarModal from "./AddCarModal";
import EditCarModal from "./EditCarModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../../utils/supabase";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCar(null);
  };

  const openDeleteConfirm = (id) => {
    setConfirmDelete({ show: true, id });
  };

  const closeDeleteConfirm = () => {
    setConfirmDelete({ show: false, id: null });
  };

  const getCarsData = async () => {
    try {
      setLoading(true);
      const res = await getCars();
      const sortedCars = res.sort((a, b) => a.id - b.id);
      setCars(sortedCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      toast.success("Car deleted successfully");
      getCarsData(); // Refresh the car list
      closeDeleteConfirm();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    }
  };

  const handleMarkAvailable = async (car) => {
    try {
      // Only update the available field
      const { data, error } = await supabase
        .from("cars")
        .update({
          available: true,
        })
        .eq("id", car.id);

      if (error) throw error;

      toast.success("Car marked as available for booking");
      getCarsData(); // Refresh the list
      return data;
    } catch (error) {
      console.error("Error updating car status:", error);
      toast.error("Failed to update car status");
    }
  };

  useEffect(() => {
    getCarsData();

    // Subscribe to changes in the cars table
    const carsSubscription = supabase
      .channel("cars-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cars",
        },
        () => {
          // Refresh data when cars table changes
          getCarsData();
        }
      )
      .subscribe();

    // Subscribe to changes in the bookings table
    const bookingsSubscription = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        () => {
          // Refresh data when bookings table changes
          getCarsData();
        }
      )
      .subscribe();

    // Cleanup subscriptions on component unmount
    return () => {
      supabase.removeChannel(carsSubscription);
      supabase.removeChannel(bookingsSubscription);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full dark:bg-gray-800 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full dark:bg-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <button className="mr-4">
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">
            All Cars
          </h2>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition shadow-md w-full sm:w-auto"
        >
          <FaPlus className="mr-2" /> Add New Car
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md dark:shadow-gray-700/50 mb-6">
        {cars.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No cars found in the database
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Car ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Steering
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Year
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Fuel Capacity
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {cars.map((car) => (
                    <tr
                      key={car.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {car.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {car.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {car.carType || car.car_type}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {car.steering_type || "-"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {car.year || "-"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {car.fuel_capacity || "-"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              car.available
                                ? "bg-green-100 text-green-800"
                                : car.status === "Booked"
                                ? "bg-blue-100 text-blue-800"
                                : car.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {car.available
                            ? "Available"
                            : car.status || "Unavailable"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600 dark:text-white text-right">
                        ${car.price_per_day}/day
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openEditModal(car)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            title="Edit car"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(car.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            title="Delete car"
                          >
                            <FaTrash />
                          </button>
                          {!car.available && (
                            <button
                              onClick={() => handleMarkAvailable(car)}
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                              title="Mark as available"
                            >
                              <FaCheck />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirm}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCar(confirmDelete.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <AddCarModal
        isOpen={addModalOpen}
        onClose={closeAddModal}
        onSuccess={getCarsData}
      />
      <EditCarModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        car={selectedCar}
        onSuccess={getCarsData}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AllCars;
