import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowUpDownLine } from "react-icons/ri";

function SearchBar2({ searchQuery, setSearchQuery }) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [tripType, setTripType] = useState("pickUp");
  const navigate = useNavigate();

  const handleSwap = () => {
    setPickupLocation(dropoffLocation);
    setDropoffLocation(pickupLocation);

    // Also swap dates and times for better UX
    const tempDate = pickupDate;
    const tempTime = pickupTime;
    setPickupDate(dropoffDate);
    setPickupTime(dropoffTime);
    setDropoffDate(tempDate);
    setDropoffTime(tempTime);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      search: searchQuery,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      tripType,
    });
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col mb-4">
      {/* Responsive container that changes layout based on screen size */}
      <div className="flex flex-col md:flex-row md:items-center p-4 md:p-10 gap-24 relative">
        {/* Swap button - positioned absolutely to overlay both sections */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-40 md:top-24 -translate-y-1/2 z-10">
          <button
            type="button"
            onClick={handleSwap}
            className="h-12 w-12 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md"
          >
            <span className="text-xl">
              <RiArrowUpDownLine />
            </span>
          </button>
        </div>

        {/* Pick-Up section */}
        <div className=" flex-1 mb-4 md:mb-0">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            {/* Radio button for Pick-Up */}
            <div className="flex items-center mb-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="pickUp"
                  checked={tripType === "pickUp"}
                  onChange={() => setTripType("pickUp")}
                  className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Pick - Up
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Location row */}
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Locations
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600  border-gray-200 dark:border-gray-500 rounded text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select your city</option>
                  <option value="Semarang">Semarang</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>

              {/* Date and Time row */}
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Date
                </label>
                <select
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600 border-l border-gray-300 dark:border-gray-500  text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select date</option>
                  <option value="20 July 2022">20 July 2022</option>
                  <option value="21 July 2022">21 July 2022</option>
                  <option value="22 July 2022">22 July 2022</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600 border-l border-gray-300 dark:border-gray-500  text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select time</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Drop-Off section */}
        <div className="flex-1 mt-[-100px] md:mt-0 relative">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            {/* Radio button for Drop-Off */}
            <div className="flex items-center mb-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="dropOff"
                  checked={tripType === "dropOff"}
                  onChange={() => setTripType("dropOff")}
                  className="form-radio h-4 w-4 text-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Drop - Off
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3">
              {/* Location row */}
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Locations
                </label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600 border-gray-200 dark:border-gray-500  text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select your city</option>
                  <option value="Semarang">Semarang</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>

              {/* Date and Time row */}
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Date
                </label>
                <select
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600 border-l border-gray-300 dark:border-gray-500 text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select date</option>
                  <option value="21 July 2022">21 July 2022</option>
                  <option value="22 July 2022">22 July 2022</option>
                  <option value="23 July 2022">23 July 2022</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
                  Time
                </label>
                <select
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-600 border-l border-gray-300 dark:border-gray-500 rounded text-gray-700 dark:text-white text-sm"
                >
                  <option value="">Select time</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar2;
