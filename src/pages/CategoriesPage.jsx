import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import { supabase } from "../utils/supabase";
import { FaBars, FaTimes } from "react-icons/fa";

function CategoriesPage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    car_type: [],
    capacity: [],
    price: 100,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const carsPerPage = 8;
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";

    setSearchQuery(search);

    const fetchCars = async () => {
      try {
        let query = supabase
          .from("cars")
          .select("*", { count: "exact" })
          .eq("available", true);

        // Apply search
        if (search) query = query.ilike("model", `%${search}%`);

        // Apply car_type filter using OR conditions for case-insensitive comparison
        if (filters.car_type && filters.car_type.length > 0) {
          // Create OR conditions for each car_type with case-insensitive matching
          const typeFilters = filters.car_type.map(
            (type) => `car_type.ilike.%${type}%`
          );
          query = query.or(typeFilters.join(","));
        }

        // Apply capacity filter
        if (filters.capacity && filters.capacity.length > 0)
          query = query.in("capacity", filters.capacity.map(Number));

        // Apply price filter
        if (filters.price) query = query.lte("price_per_day", filters.price);

        // Add pagination
        query = query.range((page - 1) * carsPerPage, page * carsPerPage - 1);

        const { data, count, error } = await query;

        if (error) throw error;

        // Fetch images for each car
        if (data && data.length > 0) {
          const carsWithImages = await Promise.all(
            data.map(async (car) => {
              const { data: imageData } = await supabase
                .from("car_images")
                .select("image_url")
                .eq("car_id", car.id)
                .limit(1);

              const imageUrl =
                imageData && imageData.length > 0
                  ? imageData[0].image_url
                  : car.image;

              return { ...car, image: imageUrl };
            })
          );

          setCars(carsWithImages);
        } else {
          setCars([]);
        }

        setTotalPages(Math.ceil(count / carsPerPage));
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]);
      }
    };

    fetchCars();
  }, [filters, searchQuery, location.search, page]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full px-4 py-6 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden bg-blue-500 text-white px-3 py-2 rounded-full flex items-center justify-center"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {/* Mobile Sidebar (conditionally rendered) */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } w-full md:hidden mb-4`}
          >
            <div className="w-full">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Desktop Sidebar (always present on md and up) */}
          <div className="hidden md:block md:w-80 flex-shrink-0 pr-4">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cars.length > 0 ? (
                cars.map((car) => <CarCard key={car.id} car={car} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No cars match your criteria.
                  </p>
                </div>
              )}
            </div>

            {cars.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Page {page} of {totalPages} ({cars.length} Cars)
                </p>
              </div>
            )}
            <Link
              to="/cars"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
