// import React, { useState, useEffect } from "react";

// const CarForm = ({ car, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     brand: "",
//     model: "",
//     year: "",
//     transmission: "",
//     capacity: "",
//     fuel_capacity: "",
//     steering: "",
//     seats: "",
//     price_per_day: "",
//     location: "",
//     description: "",
//     image_url: "",
//     features: {
//       airConditioning: false,
//       bluetooth: false,
//       gps: false,
//       parkingSensors: false,
//       backupCamera: false,
//       leatherSeats: false,
//       sunroof: false,
//       cruiseControl: false,
//     },
//   });

//   useEffect(() => {
//     if (car) {
//       setFormData(car);
//     }
//   }, [car]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         features: {
//           ...prev.features,
//           [name]: checked,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Basic Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Basic Information
//           </h3>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Type
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="Sport">Sport</option>
//               <option value="SUV">SUV</option>
//               <option value="Sedan">Sedan</option>
//               <option value="Hatchback">Hatchback</option>
//               <option value="Van">Van</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Brand
//             </label>
//             <input
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Model
//             </label>
//             <input
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//         </div>

//         {/* Technical Specifications */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Technical Specifications
//           </h3>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Year
//             </label>
//             <input
//               type="number"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               min="1900"
//               max={new Date().getFullYear() + 1}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Transmission
//             </label>
//             <select
//               name="transmission"
//               value={formData.transmission}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             >
//               <option value="">Select Transmission</option>
//               <option value="Manual">Manual</option>
//               <option value="Automatic">Automatic</option>
//               <option value="CVT">CVT</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Steering
//             </label>
//             <select
//               name="steering"
//               value={formData.steering}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             >
//               <option value="">Select Steering</option>
//               <option value="Manual">Manual</option>
//               <option value="Power">Power</option>
//               <option value="Electric">Electric</option>
//             </select>
//           </div>
//         </div>

//         {/* Capacity Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Capacity Information
//           </h3>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Seating Capacity
//             </label>
//             <input
//               type="number"
//               name="seats"
//               value={formData.seats}
//               onChange={handleChange}
//               min="1"
//               max="10"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Cargo Capacity (cubic meters)
//             </label>
//             <input
//               type="number"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               min="0"
//               step="0.1"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Fuel Capacity (liters)
//             </label>
//             <input
//               type="number"
//               name="fuel_capacity"
//               value={formData.fuel_capacity}
//               onChange={handleChange}
//               min="0"
//               step="0.1"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//         </div>

//         {/* Pricing and Location */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Pricing and Location
//           </h3>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Price per Day ($)
//             </label>
//             <input
//               type="number"
//               name="price_per_day"
//               value={formData.price_per_day}
//               onChange={handleChange}
//               min="0"
//               step="0.01"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Image URL
//             </label>
//             <input
//               type="url"
//               name="image_url"
//               value={formData.image_url}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               required
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="md:col-span-2">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Description
//           </h3>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             required
//           />
//         </div>

//         {/* Features */}
//         <div className="md:col-span-2">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Features
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {Object.entries(formData.features).map(([feature, value]) => (
//               <label key={feature} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name={feature}
//                   checked={value}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   {feature.replace(/([A-Z])/g, " $1").trim()}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//         >
//           {car ? "Update Car" : "Add Car"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CarForm;
