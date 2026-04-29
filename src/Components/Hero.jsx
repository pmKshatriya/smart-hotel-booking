import React from "react";
import { useNavigate } from "react-router-dom";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    e.preventDefault();
    
    navigate("/rooms");
  };

  return (
    <div
      className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white 
      bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'
    >
      {/* Top Tag */}
      <p className="bg-[#4989FF]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Hotel Experience
      </p>

      {/* Heading */}
     
      <h1 className="font-playfair text-2xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Getaway Destination
      </h1>

      {/* Description */}
      <p className="max-w-[520px] mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      
      <form
        onSubmit={handleSearch}
        className="bg-white text-gray-800 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row gap-4 max-md:items-start max-md:mx-auto"
      >

        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            
            <img src={assets.locationIcon} alt="location" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none rounded w-full"
            placeholder="Type here"
            required
          />

          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calendar" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>

          <input
            id="checkIn"
            type="date"
            className="border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none rounded"
            required
          />
        </div>

        {/* Check Out */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calendar" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>

          <input
            id="checkOut"
            type="date"
            className="border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none rounded"
            required
          />
        </div>

        {/* Guests */}

        <div className="flex md:flex-col max-md:gap-2 max-md:items-start">
          <div className="flex items-center gap-2">
            <img src={assets.guestsIcon} alt="guests" className="h-4" />
            <label htmlFor="guests">Guests</label>
          </div>

          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none rounded max-w-16"
            placeholder="1"
            required
          />
        </div>

        {/* Search Button */}

        <button
          type="submit"
          className="flex items-center justify-center gap-1 bg-black text-white rounded-md px-4 py-3 cursor-pointer max-md:w-full max-md:py-2 hover:bg-gray-800 transition-colors"
        >
          <img src={assets.searchIcon} alt="search" className="h-8 invert" />
          <span>Search</span>
        </button>

      </form>
    </div>
  );
};

export default Hero;