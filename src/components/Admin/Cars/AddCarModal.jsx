// import { toast, ToastContainer } from "react-toastify";
// import { useAuth } from "../../../context/AuthContext";
// import {
//   createCar,
//   uploadCarImage,
//   deleteCarImage,
// } from "../../../utils/supabase";
// import React, { useState, useRef } from "react";

// const AddCarModal = ({ isOpen, onClose, refreshData }) => {
//   const { user, loading } = useAuth();

//   console.log(user.id);
//   const [formData, setFormData] = useState({
//     car_type: "",
//     year: "",
//     description: "",
//     fuel_type: "",
//     price_per_day: "",
//     capacity: "",
//     steering_type: "",
//     name: "",
//     image_url: "",
//     location: "",
//     available: true,
//     available_from: "",
//     available_until: "",
//     favorite: false,
//     provider_id: "",
//   });
//   const [imagePreview, setImagePreview] = useState("");
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const uploadedFileName = useRef("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     if (!user) {
//       alert("Please login to upload images");
//       return;
//     }
//     if (!e.target.files || !e.target.files[0]) return;

//     const file = e.target.files[0];
//     setUploadStatus("Uploading image...");
//     setIsUploading(true);

//     try {
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);

//       // Delete previous image if exists
//       if (uploadedFileName.current) {
//         await deleteCarImage(uploadedFileName.current);
//       }

//       // Upload new image and get URL
//       const { fileName, publicUrl } = await uploadCarImage(file, user.id);
//       uploadedFileName.current = fileName;

//       // ✅ Correctly set the image URL in formData
//       setFormData((prev) => ({
//         ...prev,
//         image_url: publicUrl, // This ensures the form can be submitted
//       }));

//       setUploadStatus("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Image upload error:", error);
//       setUploadStatus("Image upload failed. Please try again.");
//       setImagePreview("");
//       uploadedFileName.current = "";
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   console.log(formData);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Ensure image_url is set before submitting
//     if (!formData.image_url) {
//       toast.warning("Please upload an image first");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       // Ensure provider_id is the authenticated user's ID
//       const carData = { ...formData, provider_id: user.id };

//       const createdCar = await createCar(carData);
//       console.log("Car inserted successfully:", createdCar);

//       toast.success("Car created successfully!");

//       setTimeout(() => {
//         onClose();
//         refreshData();
//       }, 1000);

//       // Reset form
//       setFormData({
//         car_type: "",
//         year: "",
//         description: "",
//         fuel_type: "",
//         price_per_day: "",
//         capacity: "",
//         steering_type: "",
//         name: "",
//         image_url: "",
//         location: "",
//         available: true,
//         available_from: "",
//         available_until: "",
//         favorite: false,
//         provider_id: "",
//       });
//       setImagePreview("");
//       setUploadStatus("");
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (error) {
//       console.error("Error creating car:", error);
//       alert("Error creating car. Please check your database permissions.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div
//       className={`fixed left-0 w-full top-0 bg-black/50 min-h-screen z-[100] items-center justify-center ${
//         isOpen ? "flex" : "hidden"
//       }`}
//     >
//       <div className="w-[50rem] mx-auto px-4 my-[5rem] py-10 h-[50rem] overflow-y-scroll bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Insert a Car
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           {/* Car Name */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Car Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Car Type */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Car Type
//             </label>
//             <input
//               type="text"
//               name="car_type"
//               value={formData.car_type}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Model */}
//           {/* <div>
//             <label className="block text-black dark:text-gray-300">Model</label>
//             <input
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              
//             />
//           </div> */}

//           {/* Year */}
//           <div>
//             <label className="block text-black dark:text-gray-300">Year</label>
//             <input
//               type="number"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Fuel Type */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Fuel Type
//             </label>
//             <input
//               type="text"
//               name="fuel_type"
//               value={formData.fuel_type}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Price Per Day */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Price Per Day ($)
//             </label>
//             <input
//               type="number"
//               name="price_per_day"
//               value={formData.price_per_day}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Capacity */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Capacity
//             </label>
//             <input
//               type="number"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Steering Type */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Steering Type
//             </label>
//             <input
//               type="text"
//               name="steering_type"
//               value={formData.steering_type}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-black dark:text-gray-300">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div>

//           {/* Available From */}
//           {/* <div>
//             <label className="block text-black dark:text-gray-300">
//               Available From
//             </label>
//             <input
//               type="date"
//               name="available_from"
//               value={formData.available_from}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div> */}

//           {/* Available Until */}
//           {/* <div>
//             <label className="block text-black dark:text-gray-300">
//               Available Until
//             </label>
//             <input
//               type="date"
//               name="available_until"
//               value={formData.available_until}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//             />
//           </div> */}

//           {/* Description */}
//           <div className="col-span-2">
//             <label className="block text-black dark:text-gray-300">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              
//               rows="3"
//             />
//           </div>

//           {/* Image Upload Section */}
//           <div className="col-span-2">
//             <label className="block text-black dark:text-gray-300">
//               Car Image (Upload first)
//             </label>
//             <input
//               type="file"
//               ref={fileInputRef}
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//               required
//               disabled={isUploading}
//             />

//             {uploadStatus && (
//               <p
//                 className={`text-sm mt-2 ${
//                   uploadStatus.includes("success")
//                     ? "text-green-600"
//                     : uploadStatus.includes("failed")
//                     ? "text-red-600"
//                     : "text-gray-600"
//                 }`}
//               >
//                 {uploadStatus}
//               </p>
//             )}

//             {imagePreview && (
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Image Preview:</p>
//                 <img
//                   src={imagePreview}
//                   alt="Car preview"
//                   className="max-h-60 object-contain rounded border"
//                   onLoad={() => URL.revokeObjectURL(imagePreview)}
//                 />
//                 {formData.image_url && (
//                   <p className="text-xs text-gray-500 mt-1 truncate">
//                     Image URL: {formData.image_url}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-2">
//             <button
//               type="submit"
//               disabled={isUploading || !formData.image_url}
//               className={`bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition ${
//                 isUploading || !formData.image_url
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }`}
//             >
//               {isUploading ? "Processing..." : "Submit Car"}
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCarModal;

import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import {
  createCar,
  uploadCarImage,
  deleteCarImage,
} from "../../../utils/supabase";
import React, { useState, useRef } from "react";
import { FaTimes, FaUpload, FaCar } from "react-icons/fa";

const AddCarModal = ({ isOpen, onClose, refreshData }) => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
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
    favorite: false,
    provider_id: "",
    fuel_capacity: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uploadedFileName = useRef("");

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
      setImagePreview("");
      uploadedFileName.current = "";
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
      // Create a copy of formData without the date fields if they're empty
      // This prevents sending empty strings for date fields
      const carData = { ...formData, provider_id: user.id };

      // Remove empty date fields that are causing the SQL error
      const processedCarData = Object.fromEntries(
        Object.entries(carData).filter(([key, value]) => {
          // Keep all non-date fields
          if (key !== "available_from" && key !== "available_until") {
            return true;
          }
          // Only keep date fields if they have a value
          return value !== "";
        })
      );

      const createdCar = await createCar(processedCarData);

      toast.success("Car created successfully!");

      setTimeout(() => {
        onClose();
        refreshData();
      }, 1000);

      // Reset form
      setFormData({
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
        favorite: false,
        provider_id: "",
        fuel_capacity: "",
      });
      setImagePreview("");
      setUploadStatus("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating car:", error);
      toast.error(
        `Error creating car: ${
          error.message || "Please check your database permissions."
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 mt-20 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaCar className="mr-2" /> Add New Car
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors"
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
              {/* Car Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. Toyota Camry"
                />
              </div>

              {/* Car Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type*
                </label>
                <input
                  type="text"
                  name="car_type"
                  value={formData.car_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. Sedan, SUV, Hatchback"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year*
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. 2023"
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type*
                </label>
                <input
                  type="text"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. Gasoline, Diesel, Electric"
                />
              </div>

              {/* Fuel Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Capacity*
                </label>
                <input
                  type="number"
                  name="fuel_capacity"
                  value={formData.fuel_capacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. 70"
                />
              </div>

              {/* Price Per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Day ($)*
                </label>
                <input
                  type="number"
                  name="price_per_day"
                  value={formData.price_per_day}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. 50"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Image*
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload className="text-gray-400 mb-2" size={24} />
                    <p className="text-sm text-gray-500 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                      required
                      disabled={isUploading}
                    />
                  </div>
                </div>
                {uploadStatus && (
                  <p
                    className={`text-sm mt-2 ${
                      uploadStatus.includes("success")
                        ? "text-green-600"
                        : uploadStatus.includes("failed")
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity*
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. 5"
                />
              </div>

              {/* Steering Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Steering Type*
                </label>
                <input
                  type="text"
                  name="steering_type"
                  value={formData.steering_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. Manual, Automatic"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g. New York, NY"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Provide a detailed description of the car"
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="max-h-48 object-contain rounded border"
                    onLoad={() => URL.revokeObjectURL(imagePreview)}
                  />
                </div>
              )}
            </div>

            {/* Submit Button - Full Width */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={isUploading || !formData.image_url}
                className={`w-full py-3 px-4 rounded-md text-white font-medium 
                  ${
                    isUploading || !formData.image_url
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors shadow-md`}
              >
                {isUploading ? "Processing..." : "Submit Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarModal;