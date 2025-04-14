import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";
import { useTheme } from "../context/ThemeContext";
import { supabase, getCountries, getRegionsByCountry } from "../utils/supabase";
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
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchForm, setSearchForm] = useState({
    country: "",
    region: "",
    carMake: "",
    pickupDate: "2025-03-18",
    returnDate: "2025-03-22",
  });

  useEffect(() => {
    // Fetch countries from Supabase
    async function fetchCountries() {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);

        // Set default country if available
        if (countriesData.length > 0) {
          setSearchForm((prev) => ({
            ...prev,
            country: countriesData[0].id, // Use ID instead of name for selection
          }));

          // Fetch regions for the default country
          fetchRegionsByCountry(countriesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

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

    fetchCountries();
    fetchHeroImages();
    fetchFeaturedCars();
  }, []);

  // Fetch regions when country changes
  const fetchRegionsByCountry = async (countryId) => {
    try {
      const regionsData = await getRegionsByCountry(countryId);
      setRegions(regionsData);

      // Reset region when country changes
      setSearchForm((prev) => ({
        ...prev,
        region: "",
      }));
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));

    // If country changes, fetch regions for that country
    if (name === "country") {
      fetchRegionsByCountry(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      country: searchForm.country,
      region: searchForm.region,
      search: searchForm.carMake,
      pickupDate: searchForm.pickupDate,
      returnDate: searchForm.returnDate,
    }).toString();
    navigate(`/cars?${queryParams}`);
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
            <div className="mt-80 bg-white dark:bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-md">
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
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <select
                    name="region"
                    value={searchForm.region}
                    onChange={handleSearchFormChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={!searchForm.country}
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
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
      <div className="mx-auto p-6">
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
