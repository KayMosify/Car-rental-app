import React from "react";

function FilterSidebar({ filters, setFilters }) {
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => {
      const currentValues = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter((v) => v !== value) };
      }
    });
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, price: parseInt(e.target.value) }));
  };

  // Car types with exact case matching to database values
  // Replace these with the exact values from your database
  const carTypes = [
    { display: "Sport", value: "Sport" },
    { display: "SUV", value: "SUV" },
    { display: "MPV", value: "MPV" },
    { display: "Sedan", value: "Sedan" },
    { display: "Coupe", value: "Coupe" },
    { display: "Hatchback", value: "Hatchback" },
  ];

  // Capacity options based on your CarCard component
  const capacityOptions = [
    { label: "2 Person", value: "2" },
    { label: "4 Person", value: "4" },
    { label: "6 Person", value: "6" },
    { label: "8 or More", value: "8" },
  ];

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold mb-4 text-gray-400 dark:text-white">
        TYPE
      </h3>
      {carTypes.map((type) => (
        <label key={type.value} className="flex items-center mb-2">
          <input
            type="checkbox"
            name="car_type"
            value={type.value}
            checked={filters.car_type && filters.car_type.includes(type.value)}
            onChange={handleCheckboxChange}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-500 rounded"
          />
          <span className="text-gray-600 p-2 text-xl font-semibold dark:text-gray-300">
            {type.display}
          </span>
          <span className="text-gray-400 font-medium texl-xl"> (10)</span>
        </label>
      ))}
      <h3 className="text-sm font-semibold mb-4 mt-6 text-gray-400 dark:text-white">
        CAPACITY
      </h3>
      {capacityOptions.map((option) => (
        <label key={option.label} className="flex items-center mb-2">
          <input
            type="checkbox"
            name="capacity"
            value={option.value}
            checked={
              filters.capacity && filters.capacity.includes(option.value)
            }
            onChange={handleCheckboxChange}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-500 rounded"
          />
          <span className="text-gray-600 p-2 text-xl font-semibold dark:text-gray-300">
            {option.label}
          </span>
          <span className="text-gray-400 font-medium texl-xl"> (10)</span>
        </label>
      ))}
      <h2 className="text-lg font-semibold mb-4 mt-6 text-gray-900 dark:text-white">
        PRICE
      </h2>
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="200"
          value={filters.price || 100}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Max ${filters.price || 100}.00
        </p>
      </div>
    </div>
  );
}

export default FilterSidebar;