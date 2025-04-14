import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for data fetching
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};

export const getCountries = async () => {
  const { data, error } = await supabase
    .from('countries')
    .select('*');
  if (error) throw error;
  return data;
};

export const getRegionsByCountry = async (countryId) => {
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('country_id', countryId);
  if (error) throw error;
  return data;
};

// Create a new car
export const createCar = async (carData) => {
  const { data, error } = await supabase
    .from('cars')
    .insert([carData])
    .select(); // Returns the inserted record

  if (error) throw error;
  return data[0];
};

export const getCars = async () => {
  const { data, error } = await supabase
    .from('cars')
    .select('*');
  if (error) throw error;
  return data;
};

// Function to update a car
export const updateCar = async (id, carData) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .update(carData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

// Function to delete a car
export const deleteCar = async (id) => {
  try {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

// Fetch car details by ID
export async function fetchCarById(carId) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", carId)
    .single();
  if (error) {
    console.error("Error fetching car:", error);
    return null;
  }
  return data;
}

// Fetch popular cars
export const getPopularCars = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('is_popular', true)
      .eq('available', true)
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching popular cars:', error);
    return [];
  }
};

// Fetch recommended cars
export const getRecommendedCars = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('is_recommended', true)
      .eq('available', true)
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recommended cars:', error);
    return [];
  }
};

export const getBookings = async (userId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const getReviews = async (carId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('car_id', carId);
  if (error) throw error;
  return data;
};

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorite')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

// Image Upload Functions
export const uploadCarImage = async (file, userId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  // Upload image to Supabase storage
  const { data, error } = await supabase
    .storage
    .from('car-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });

  if (error) throw error;

  console.log("Upload data:", data);

  // Manually create the public URL
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/car-images/${data.path}`;

  return { fileName, publicUrl };
};


export const deleteCarImage = async (fileName) => {
  const { error } = await supabase
    .storage
    .from('car-images')
    .remove([fileName]);

  if (error) console.error("Delete error:", error);
};

// Add a new review for a particular car
export const addReview = async (carId, userId, review) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          car_id: carId,
          user_id: userId,
          user_name: review.user_name,
          user_title: review.user_title,
          rating: review.rating,
          comment: review.comment,
          review_date: new Date(),
        },
      ])
      .select(); // Returns the inserted record

    if (error) {
      throw new Error(error.message);
    }

    console.log('Inserted review:', data);

    return data[0]; // Return the inserted review
  } catch (error) {
    console.error('Error inserting review:', error);
    throw error;
  }
};

export const fetchReviewsByCarId = async (carId) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('car_id', carId); // Assuming the reviews table has a car_id column

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

// Create a booking
export const createBooking = async (bookingData) => {
  // Ensure new bookings start with "Pending" status
  const bookingWithStatus = {
    ...bookingData,
    status: bookingData.status || "Pending" // Default to "Pending" if not specified
  };
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingWithStatus])
    .select(); // Returns the inserted booking

  if (error) throw error;
  return data[0];
};

// Function to refresh a car's availability status
export const refreshCarAvailability = async (carId) => {
  try {
    // First get the car details
    const car = await fetchCarById(carId);
    if (!car) {
      throw new Error("Car not found");
    }

    // Get current date for availability check
    const today = new Date().toISOString().split('T')[0];

    // Use the existing checkCarAvailability function to see if the car has any active bookings
    const { available } = await checkCarAvailability(carId, today, today);

    // Update the car's available status in the database if it differs
    if (car.available !== available) {
      const { data, error } = await supabase
        .from('cars')
        .update({ available: available })
        .eq('id', carId)
        .select();

      if (error) throw error;
      return data[0];
    }

    return car;
  } catch (error) {
    console.error('Error refreshing car availability:', error);
    throw error;
  }
};


// Add this to your supabase.js file
export const checkCarAvailability = async (carId, pickUpDate, dropOffDate) => {
  try {
    // Check if the car is available in the 'cars' table (based on the 'available' field)
    const { data: car, error: carError } = await supabase
      .from("cars")
      .select("available")
      .eq("id", carId)
      .single();

    if (carError) {
      console.error("Error fetching car availability:", carError.message);
      throw new Error(carError.message); // Provide more detailed error
    }

    // If the car is not available, return false immediately
    if (!car.available) {
      return { available: false, message: "Car is not available for booking" };
    }

    // Now check the bookings table to see if the car is already booked for the selected dates
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .eq("car_id", carId)
      .gte("pickup_date", pickUpDate)
      .lte("dropoff_date", dropOffDate);

    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError.message);
      throw new Error(bookingsError.message); // Provide more detailed error
    }

    // If there are any bookings overlapping the desired dates, return false
    if (bookings.length > 0) {
      return { available: false, message: "Car is already booked for the selected dates" };
    }

    // If all checks pass, the car is available
    return { available: true };
  } catch (error) {
    console.error("Error checking car availability:", error);
    return { available: false, message: error.message || "Error checking availability" }; // More detailed error message
  }
};

export const updateCarStatus = async (carId, updates) => {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', carId)
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};


