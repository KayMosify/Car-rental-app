import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../utils/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [searchForm, setSearchForm] = useState({
    country: "Nigeria",
    region: "",
    carMake: "",
    pickupDate: "2025-03-18",
    returnDate: "2025-03-22",
  });

  useEffect(() => {
    // Fetch car images for the hero section
    async function fetchHeroImages() {
      const { data, error } = await supabase
        .from("car_images")
        .select("*")
        .limit(5); // Get up to 5 images for the hero slider

      if (error) {
        console.error("Error fetching hero images:", error);
        return;
      }

      // If we got images, use them; otherwise use a default
      if (data && data.length > 0) {
        setHeroImages(data);
      } else {
        // Use a default image if no images found
        setHeroImages([
          {
            id: "default",
            image_url:
              "https://your-supabase-project.supabase.co/storage/v1/object/public/car-images/hero-background.jpg",
          },
        ]);
      }
    }

    async function fetchFeaturedCars() {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("available", true)
        .limit(3);

      if (error) {
        console.error("Error fetching featured cars:", error);
        return;
      }

      // Also fetch images for these featured cars
      if (data && data.length > 0) {
        // For each car, try to find its image
        const carsWithImages = await Promise.all(
          data.map(async (car) => {
            const { data: imageData } = await supabase
              .from("car_images")
              .select("image_url")
              .eq("car_id", car.id)
              .limit(1);

            // Use the car_images image if available, otherwise keep the original image
            const imageUrl =
              imageData && imageData.length > 0
                ? imageData[0].image_url
                : car.image;

            return { ...car, image: imageUrl };
          })
        );

        setFeaturedCars(carsWithImages);
      } else {
        setFeaturedCars([]);
      }
    }

    fetchHeroImages();
    fetchFeaturedCars();
  }, []);

  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      search: searchForm.carMake,
      pickupDate: searchForm.pickupDate,
      returnDate: searchForm.returnDate,
    }).toString();
    navigate(`/cars`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      {/* Hero Section with Swiper for Background Images */}
      <div className="relative min-h-screen">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="h-screen w-full"
        >
          {heroImages.map((heroImage) => (
            <SwiperSlide key={heroImage.id}>
              <div
                className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url('${heroImage.image_url}')`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Form - positioned on top of the hero slider */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="mt-20 bg-white dark:bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-md">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-wrap gap-4 justify-center items-end"
              >
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={searchForm.country}
                    onChange={handleSearchFormChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={searchForm.region}
                    onChange={handleSearchFormChange}
                    placeholder="Your Region"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Car Make
                  </label>
                  <select
                    name="carMake"
                    value={searchForm.carMake}
                    onChange={handleSearchFormChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Any</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="BMW">BMW</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Ford">Ford</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={searchForm.pickupDate}
                    onChange={handleSearchFormChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={searchForm.returnDate}
                    onChange={handleSearchFormChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Search for Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Featured Cars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars?.map((car) => (
            <CarCard key={car?.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
