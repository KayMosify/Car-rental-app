import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  supabase,
  fetchCarById,
  createBooking,
  refreshCarAvailability,
  getCountries,
  getRegionsByCountry,
} from "../utils/supabase";
import { useAuth } from "../context/AuthContext";
import BookingConfirmationModal from "../components/BookingConfirmationModal";

function BookingForm() {
  const { carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [carDetails, setCarDetails] = useState(null);
  const [countries, setCountries] = useState([]);
  const [pickupRegions, setPickupRegions] = useState([]);
  const [dropoffRegions, setDropoffRegions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    townCity: "",
    pickupCountry: "",
    pickUpLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropoffCountry: "",
    dropOffLocation: "",
    dropOffDate: "",
    dropOffTime: "",
    rentalType: "pickUp", // Default selection
    promoCode: "",
  });
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [applyingPromo, setApplyingPromo] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch regions when pickup country changes
  useEffect(() => {
    const fetchPickupRegions = async () => {
      if (formData.pickupCountry) {
        try {
          const regions = await getRegionsByCountry(formData.pickupCountry);
          setPickupRegions(regions);
        } catch (error) {
          console.error("Error fetching pickup regions:", error);
        }
      } else {
        setPickupRegions([]);
      }
    };

    fetchPickupRegions();
  }, [formData.pickupCountry]);

  // Fetch regions when dropoff country changes
  useEffect(() => {
    const fetchDropoffRegions = async () => {
      if (formData.dropoffCountry) {
        try {
          const regions = await getRegionsByCountry(formData.dropoffCountry);
          setDropoffRegions(regions);
        } catch (error) {
          console.error("Error fetching dropoff regions:", error);
        }
      } else {
        setDropoffRegions([]);
      }
    };

    fetchDropoffRegions();
  }, [formData.dropoffCountry]);

  useEffect(() => {
    const getCarDetails = async () => {
      if (carId) {
        setLoading(true);
        try {
          const car = await fetchCarById(carId);
          if (car) {
            setCarDetails(car);
            setTotalPrice(car.price_per_day || car.price || 0);
          }
        } catch (error) {
          console.error("Error fetching car details:", error);
          setError("Failed to load car details");
        } finally {
          setLoading(false);
        }
      }
    };

    getCarDetails();
  }, [carId]);

  // Calculate rental duration and update total price when dates change
  useEffect(() => {
    if (carDetails && formData.pickUpDate && formData.dropOffDate) {
      const startDate = new Date(formData.pickUpDate);
      const endDate = new Date(formData.dropOffDate);

      if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
        // Calculate days difference (add 1 since rental includes both pickup and dropoff days)
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Update price based on rental duration
        const basePrice = carDetails.price_per_day || carDetails.price || 0;
        setTotalPrice(basePrice * (diffDays || 1));
      }
    }
  }, [formData.pickUpDate, formData.dropOffDate, carDetails]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const applyPromoCode = async () => {
    if (!formData.promoCode) return;

    setApplyingPromo(true);
    // In a real application, you would verify the promo code with your backend
    // For this example, we'll just simulate a discount

    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example logic - apply 10% discount for "SAVE10" code
      if (formData.promoCode.toUpperCase() === "SAVE10") {
        setTotalPrice((prevPrice) => prevPrice * 0.9);
        alert("Promo code applied successfully! 10% discount.");
      } else {
        alert("Invalid promo code.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
    } finally {
      setApplyingPromo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        throw new Error("Please log in to make a booking");
      }

      // Validation
      if (
        !formData.name ||
        !formData.phone ||
        !formData.pickUpDate ||
        !formData.dropOffDate ||
        !formData.pickUpLocation ||
        !formData.dropOffLocation
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Check car availability
      const availability = await refreshCarAvailability(
        carId,
        formData.pickUpDate,
        formData.dropOffDate
      );

      if (!availability.available) {
        throw new Error(
          availability.message ||
            "This car is not available for the selected dates"
        );
      }

      // Create booking
      const bookingData = {
        user_id: user.id,
        user_name: formData.name,
        user_phone: formData.phone,
        user_address: formData.address, // Add this line to include the address
        car_id: carId,
        car_name: carDetails?.name || "Unknown Car",
        pickup_location: formData.pickUpLocation,
        pickup_date: formData.pickUpDate,
        pickup_time: formData.pickUpTime,
        dropoff_location: formData.dropOffLocation,
        dropoff_date: formData.dropOffDate,
        dropoff_time: formData.dropOffTime,
        total_price: totalPrice,
        status: "Pending", // Initial status is Pending
        name: carDetails?.name || "Car",
        created_at: new Date().toISOString(),
      };

      const result = await createBooking(bookingData);

      // Set booking ID for the confirmation modal
      if (result && result.id) {
        setBookingId(result.id);
        setShowConfirmation(true);
      } else {
        // If the API returns data in a different format, adjust accordingly
        const newBookingId = result?.data?.[0]?.id || "Unknown";
        setBookingId(newBookingId);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !carDetails)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="w-full bg-gray-100 font-sans pb-8">
      <div className="mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            {/* Billing Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-bold mb-1">Billing Info</h2>
              <p className="text-sm text-gray-500 mb-4">
                Please enter your billing info
              </p>
              <p className="text-xs text-gray-400 mb-5">Step 1 of 4</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Town / City
                  </label>
                  <input
                    type="text"
                    name="townCity"
                    placeholder="Town or city"
                    value={formData.townCity}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Rental Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-1">Rental Info</h2>
              <p className="text-sm text-gray-500 mb-4">
                Please select your rental date
              </p>
              <p className="text-xs text-gray-400 mb-5">Step 2 of 4</p>

              {/* Pick-Up Section */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="pickUp"
                    name="rentalType"
                    value="pickUp"
                    checked={formData.rentalType === "pickUp"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="pickUp"
                    className="ml-2 text-base font-medium text-blue-600"
                  >
                    Pick - Up
                  </label>
                </div>

                {/* Country Selection for Pickup */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="pickupCountry"
                      value={formData.pickupCountry}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                      required
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Regions/Locations
                    </label>
                    <div className="relative">
                      <select
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                        required
                        disabled={!formData.pickupCountry}
                      >
                        <option value="">Select a region</option>
                        {pickupRegions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="pickUpDate"
                        value={formData.pickUpDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="relative">
                    <select
                      name="pickUpTime"
                      value={formData.pickUpTime}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                      required
                    >
                      <option value="">Select your time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drop-Off Section */}
              <div>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="dropOff"
                    name="rentalType"
                    value="dropOff"
                    checked={formData.rentalType === "dropOff"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="dropOff"
                    className="ml-2 text-base font-medium text-blue-600"
                  >
                    Drop - Off
                  </label>
                </div>

                {/* Country Selection for Dropoff */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="dropoffCountry"
                      value={formData.dropoffCountry}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                      required
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Regions/Locations
                    </label>
                    <div className="relative">
                      <select
                        name="dropOffLocation"
                        value={formData.dropOffLocation}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                        required
                        disabled={!formData.dropoffCountry}
                      >
                        <option value="">Select a region</option>
                        {dropoffRegions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dropOffDate"
                        value={formData.dropOffDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="relative">
                    <select
                      name="dropOffTime"
                      value={formData.dropOffTime}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-gray-300 text-sm bg-gray-50 appearance-none pr-10"
                      required
                    >
                      <option value="">Select your time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary - Unchanged */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-1">RENTAL SUMMARY</h2>
              <p className="text-xs text-gray-500 mb-5">
                Prices may change depending on the length of the rental and the
                price of your rental car.
              </p>

              {carDetails && (
                <div className="flex items-center mb-5">
                  <img
                    src={carDetails.image_url || "/api/placeholder/100/64"}
                    alt={carDetails.name || "Car image"}
                    className="w-24 h-14 mr-4 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {carDetails.name || "Rental Car"}
                    </h3>
                    <div className="text-xs text-gray-500">
                      <span>★★★★★</span> 440+ Reviewer
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-5">
                  <span>Tax</span>
                  <span>$0</span>
                </div>

                <div className="flex items-center mb-5">
                  <input
                    type="text"
                    name="promoCode"
                    placeholder="Promo code"
                    value={formData.promoCode}
                    onChange={handleChange}
                    className="flex-grow p-2 border border-gray-300 rounded-l-md text-sm"
                  />
                  <button
                    type="button"
                    className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
                    onClick={applyPromoCode}
                    disabled={applyingPromo || !formData.promoCode}
                  >
                    {applyingPromo ? "Applying..." : "Apply Now"}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-5">
                <div className="flex justify-between text-base font-bold mb-2">
                  <span>TOTAL RENTAL PRICE</span>
                  <span className="text-xl text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Overall price and includes rental discount
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
              >
                {loading ? "Processing..." : "Rent Now"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        show={showConfirmation}
        bookingId={bookingId}
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}

export default BookingForm;
