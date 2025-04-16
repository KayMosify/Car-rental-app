import React, { useState, useEffect } from "react";
import CarListingHero from "../components/CarListingHero";
import SearchBar2 from "../components/SearchBar2";
import { getPopularCars, getRecommendedCars } from "../utils/supabase";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard"; // Import your original CarCard component

const CarListing = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        // Fetch both popular and recommended cars
        const [popularData, recommendedData] = await Promise.all([
          getPopularCars(),
          getRecommendedCars(),
        ]);

        setPopularCars(popularData);
        setRecommendedCars(recommendedData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Car Section Component
  const CarSection = ({ title, cars, viewAllLink }) => {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <Link
            to={viewAllLink}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <CarListingHero />
      <SearchBar2 />
      <div className="text-center my-8">
        <Link
          to="/categories"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Browse All Categories
        </Link>
      </div>

      <div className="mx-auto px-4 py-8">
        <CarSection
          title="Popular Cars"
          cars={popularCars}
          viewAllLink="/cars/popular"
        />

        <CarSection
          title="Recommended Cars"
          cars={recommendedCars}
          viewAllLink="/cars/recommended"
        />
      </div>
    </div>
  );
};

export default CarListing;
