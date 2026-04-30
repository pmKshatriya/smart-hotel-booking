import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={"/rooms/" + room._id}
      onClick={handleClick}
      className="relative max-w-72 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300"
    >
      {/* Room Image */}

      <img
        src={room.images[0]}
        alt={room.hotel.name}
        className="w-full h-48 object-cover"
      />

      {index % 2 === 0 && room.isAvailable && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full shadow-sm">
          Best Seller
        </p>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800 truncate">
            {room.hotel.name}
          </p>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span className="text-sm">{room.rating ?? 4.5}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm mt-1">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span className="truncate">{room.hotel.address}</span>
        </div>

        {/* Price & Book Button */}
        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl font-semibold text-gray-800">
              ${room.pricePerNight}
            </span>
            <span className="text-sm">/night</span>
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
