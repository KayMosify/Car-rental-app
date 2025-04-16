// import { useAuth } from "../context/AuthContext";
// import { createCar, uploadCarImage, deleteCarImage } from "../utils/supabase";
// import React, { useState, useRef } from "react";

// const InsertCars = () => {
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
//       alert("Please upload an image first");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       // Ensure provider_id is the authenticated user's ID
//       const carData = { ...formData, provider_id: user.id };

//       const createdCar = await createCar(carData);
//       console.log("Car inserted successfully:", createdCar);

//       alert("Car created successfully!");
//     } catch (error) {
//       console.error("Error creating car:", error);
//       alert("Error creating car. Please check your database permissions.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-[50rem] mx-auto px-4 my-[5rem] py-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">Insert a Car</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {/* Car Name */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300">
//             Car Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//           />
//         </div>

//         {/* Car Type */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300">
//             Car Type
//           </label>
//           <input
//             type="text"
//             name="car_type"
//             value={formData.car_type}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//           />
//         </div>

//         {/* Model */}
//         {/* <div>
//           <label className="block text-black dark:text-gray-300">Model</label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"

//           />
//         </div> */}

//         {/* Year */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300">Year</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//           />
//         </div>

//         {/* Fuel Type */}
//         <div>
//           <label className="block text-gray-700 dark:text-gray-300">
//             Fuel Type
//           </label>
//           <input
//             type="text"
//             name="fuel_type"
//             value={formData.fuel_type}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             required
//           />
//         </div>

//         {/* Price Per Day */}
//         <div>
//           <label className="block text-black dark:text-gray-300">
//             Price Per Day ($)
//           </label>
//           <input
//             type="number"
//             name="price_per_day"
//             value={formData.price_per_day}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             required
//           />
//         </div>

//         {/* Capacity */}
//         <div>
//           <label className="block text-black dark:text-gray-300">
//             Capacity
//           </label>
//           <input
//             type="number"
//             name="capacity"
//             value={formData.capacity}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             required
//           />
//         </div>

//         {/* Steering Type */}
//         <div>
//           <label className="block text-black dark:text-gray-300">
//             Steering Type
//           </label>
//           <input
//             type="text"
//             name="steering_type"
//             value={formData.steering_type}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             required
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-black dark:text-gray-300">
//             Location
//           </label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//           />
//         </div>

//         {/* Description */}
//         <div className="col-span-2">
//           <label className="block text-black dark:text-gray-300">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             rows="3"
//           />
//         </div>

//         {/* Image Upload Section */}
//         <div className="col-span-2">
//           <label className="block text-black dark:text-gray-300">
//             Car Image (Upload first)
//           </label>
//           <input
//             type="file"
//             ref={fileInputRef}
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
//             required
//             disabled={isUploading}
//           />

//           {uploadStatus && (
//             <p
//               className={`text-sm mt-2 ${
//                 uploadStatus.includes("success")
//                   ? "text-green-600"
//                   : uploadStatus.includes("failed")
//                   ? "text-red-600"
//                   : "text-gray-600"
//               }`}
//             >
//               {uploadStatus}
//             </p>
//           )}

//           {imagePreview && (
//             <div className="mt-4">
//               <p className="text-sm font-medium mb-2">Image Preview:</p>
//               <img
//                 src={imagePreview}
//                 alt="Car preview"
//                 className="max-h-60 object-contain rounded border"
//                 onLoad={() => URL.revokeObjectURL(imagePreview)}
//               />
//               {formData.image_url && (
//                 <p className="text-xs text-gray-500 mt-1 truncate">
//                   Image URL: {formData.image_url}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="col-span-2">
//           <button
//             type="submit"
//             disabled={isUploading || !formData.image_url}
//             className={`bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition ${
//               isUploading || !formData.image_url
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             {isUploading ? "Processing..." : "Submit Car"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default InsertCars;
