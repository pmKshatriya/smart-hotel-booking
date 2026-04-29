import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import StarRating from "../Components/StarRating";

// CheckBox Component
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="accent-indigo-500 cursor-pointer"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

// RadioButton Component
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
        className="accent-indigo-500 cursor-pointer"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

// AllRooms Component
const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const handleRoomTypeChange = (checked, label) => {
    if (checked) {
      setSelectedRoomTypes([...selectedRoomTypes, label]);
    } else {
      setSelectedRoomTypes(selectedRoomTypes.filter((item) => item !== label));
    }
  };

  const handlePriceRangeChange = (checked, label) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, label]);
    } else {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((item) => item !== label),
      );
    }
  };

  const handleClear = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSort("");
  };

  const filteredRooms = useMemo(() => {
    let rooms = [...roomsDummyData];

    // Room type filter
    if (selectedRoomTypes.length > 0) {
      rooms = rooms.filter((room) => selectedRoomTypes.includes(room.roomType));
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      rooms = rooms.filter((room) => {
        return selectedPriceRanges.some((range) => {
          const [min, max] = range
            .replace(/\$ /g, "")
            .split(" to ")
            .map(Number);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        });
      });
    }

    if (selectedSort === "Price Low to High") {
      rooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (selectedSort === "Price High to Low") {
      rooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (selectedSort === "Newest First") {
      rooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return rooms;
  }, [selectedRoomTypes, selectedPriceRanges, selectedSort]);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
      {/* Room Listings */}
      <div className="w-full lg:w-auto">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-xl">No rooms found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
            <button
              onClick={handleClear}
              className="mt-4 text-indigo-500 underline text-sm cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-0 last:pb-20"
            >
              {/* Room Image */}
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);

                  window.scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt={room.hotel.name}
                title="View Room Details"
                className="max-h-64 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer w-full"
              />

              {/* Room Info */}
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>

                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);

                    window.scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer hover:text-gray-600 transition-colors"
                >
                  {room.hotel.name}
                </p>

                <div className="flex items-center gap-2">
                  <StarRating rating={room.rating ?? 4} />
                  <p className="text-sm text-gray-500">200+ reviews</p>
                </div>

                {/* Address */}
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img
                    src={assets.locationIcon}
                    alt="location"
                    className="w-4 h-4"
                  />
                  <span>{room.hotel.address}</span>
                </div>

                {/* Room Amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Price + Book Button */}
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium text-gray-700">
                    ${room.pricePerNight}
                    <span className="text-sm font-normal"> /night</span>
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters Sidebar */}
      <div className="bg-white w-full lg:w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 rounded-xl overflow-hidden">
        {/* Filter Header */}

        <div
          className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="flex items-center gap-3 text-xs cursor-pointer">
            {(selectedRoomTypes.length > 0 ||
              selectedPriceRanges.length > 0 ||
              selectedSort) && (
              <span
                className="text-indigo-500 cursor-pointer"
                onClick={handleClear}
              >
                CLEAR
              </span>
            )}
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden text-gray-600"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        {/* Filter Content */}
        <div
          className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-300`}
        >
          {/* Popular Filters (Room Types) */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          {/* Price Range */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                selected={selectedPriceRanges.includes(`$ ${range}`)}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>

          {/* Sort By */}
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={setSelectedSort}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
