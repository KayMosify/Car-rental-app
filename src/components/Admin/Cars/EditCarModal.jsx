import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import {
  updateCar,
  uploadCarImage,
  deleteCarImage,
} from "../../../utils/supabase";
import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUpload, FaEdit } from "react-icons/fa";

const EditCarModal = ({ isOpen, onClose, refreshData, car }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
    car_type: "",
    year: "",
    description: "",
    fuel_type: "",
    price_per_day: "",
    capacity: "",
    steering_type: "",
    name: "",
    image_url: "",
    location: "",
    available: true,
    status: "",
    provider_id: "",
    fuel_capacity: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uploadedFileName = useRef("");

  // Initialize form with car data when car prop changes
  useEffect(() => {
    if (car) {
      setFormData({
        id: car.id,
        car_type: car.car_type || car.carType || "",
        year: car.year || "",
        description: car.description || "",
        fuel_type: car.fuel_type || "",
        price_per_day: car.price_per_day || car.totalPrice || "",
        capacity: car.capacity || "",
        steering_type: car.steering_type || "",
        name: car.name || "",
        image_url: car.image_url || "",
        location: car.location || "",
        available: car.available !== undefined ? car.available : true,
        status: car.status || "Available",
        provider_id: car.provider_id || user?.id || "",
        fuel_capacity: car.fuel_capacity || "",
      });

      if (car.image_url) {
        setImagePreview(car.image_url);
      }
    }
  }, [car, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    if (!user) {
      toast.error("Please login to upload images");
      return;
    }
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setUploadStatus("Uploading image...");
    setIsUploading(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Delete previous image if exists
      if (uploadedFileName.current) {
        await deleteCarImage(uploadedFileName.current);
      }

      // Upload new image and get URL
      const { fileName, publicUrl } = await uploadCarImage(file, user.id);
      uploadedFileName.current = fileName;

      setFormData((prev) => ({
        ...prev,
        image_url: publicUrl,
      }));

      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadStatus("Image upload failed. Please try again.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image_url) {
      toast.warning("Please upload an image first");
      return;
    }

    setIsUploading(true);

    try {
      // Create a copy of formData without the status field
      const { status, ...dataToUpdate } = formData;

      // Update the car with only the fields that exist in the database
      await updateCar(formData.id, dataToUpdate);

      toast.success("Car updated successfully!");

      setTimeout(() => {
        onClose();
        refreshData();
      }, 1000);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error(
        "Error updating car. Please check your database permissions."
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between bg-blue-600 dark:bg-blue-700 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaEdit className="mr-2" /> Edit Car
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-800 p-2 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left column */}
            <div className="space-y-4">
              {/* Car ID (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                  readOnly
                />
              </div>

              {/* Car Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Car Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car Type*
                </label>
                <input
                  type="text"
                  name="car_type"
                  value={formData.car_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year*
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fuel Type*
                </label>
                <input
                  type="text"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Available">Available</option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car Image
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload
                      className="text-gray-400 dark:text-gray-500 mb-2"
                      size={24}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Upload new image or keep existing
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                    />
                  </div>
                </div>
                {uploadStatus && (
                  <p
                    className={`text-sm mt-2 ${
                      uploadStatus.includes("success")
                        ? "text-green-600 dark:text-green-400"
                        : uploadStatus.includes("failed")
                        ? "text-red-600 dark:text-red-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Price Per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price Per Day ($)*
                </label>
                <input
                  type="number"
                  name="price_per_day"
                  value={formData.price_per_day}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacity*
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Steering Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Steering Type*
                </label>
                <input
                  type="text"
                  name="steering_type"
                  value={formData.steering_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows="4"
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="max-h-48 object-contain rounded border border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Submit Button - Full Width */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium 
                  ${
                    isUploading
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
                  } transition-colors shadow-md`}
              >
                {isUploading ? "Processing..." : "Update Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCarModal;
