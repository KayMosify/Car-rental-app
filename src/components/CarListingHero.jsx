import React from "react";
import WhiteCar from "../assets/Car5.png";
import SilverCar from "../assets/Car1.png";

const CarListingHero = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-10 p-2 md:p-10 max-w-screen mx-auto min-w-0">
      {/* First Card */}
      <div className="w-full h-auto min-h-[300px] md:h-[400px] md:w-1/2 bg-blue-400 dark:bg-blue-500 rounded-xl p-4 md:p-10 text-white relative overflow-hidden">
        <div className="z-10 relative">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 md:mb-3">
            The Best Platform
            <br />
            for Car Rental
          </h2>
          <p className="mb-4 md:mb-8 opacity-90 text-xs sm:text-sm md:text-base">
            Ease of doing a car rental safely and
            <br />
            reliably. Of course at a low price.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-1 px-4 md:py-2 md:px-6 rounded-lg text-sm md:text-base">
            Rental Car
          </button>
        </div>
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-8 flex justify-center items-center">
          <img
            src={WhiteCar}
            alt="White sports car"
            className="h-20 sm:h-24 md:h-36 object-contain mr-4 md:mr-24"
          />
        </div>
      </div>

      {/* Second Card - Hidden on mobile, visible on md screens and up */}
      <div className="hidden md:block w-full h-[400px] md:w-1/2 bg-blue-600 dark:bg-blue-700 rounded-xl p-6 md:p-10 text-white relative overflow-hidden">
        <div className="z-10 relative">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Easy way to rent a<br />
            car at a low price
          </h2>
          <p className="mb-8 opacity-90 text-sm md:text-base">
            Providing cheap car rental services
            <br />
            and safe and comfortable facilities.
          </p>
          <button className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg">
            Rental Car
          </button>
        </div>
        <div className="absolute bottom-4 right-4 md:right-8 flex justify-center items-center">
          <img
            src={SilverCar}
            alt="Silver sports car"
            className="h-28 md:h-36 object-contain mr-4 md:mr-24"
          />
        </div>
      </div>
    </div>
  );
};

export default CarListingHero;
