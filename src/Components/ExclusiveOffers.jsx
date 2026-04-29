import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  const navigate = useNavigate();

  return (
    // FIX: pb-30 → pb-20 (valid Tailwind class)
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-20">

      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* FIX: "Exclusive Offfers" → "Exclusive Offers" (double ff typo) */}
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories"
        />

        {/* FIX: onClick handler add kiya */}
        <button
          onClick={() => navigate("/rooms")}
          className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12 hover:text-gray-600 transition-colors"
        >
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow"
            className="group-hover:translate-x-1 transition-all w-4"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            // FIX: md:pt-18 → md:pt-16 (valid Tailwind class)
            // FIX: min-h add kiya taaki cards consistent height mein rahein
            // FIX: dark overlay add kiya for text readability
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center min-h-64 overflow-hidden"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* FIX: Dark overlay — bright image pe white text readable nahi hota */}
            <div className="absolute inset-0 bg-black/40 rounded-xl" />

            {/* Badge */}
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full z-10">
              {item.priceOff}% OFF
            </p>

            {/* Content — z-10 taaki overlay ke upar rahe */}
            <div className="relative z-10">
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              {/* FIX: text-sm add kiya for consistency */}
              <p className="text-sm mt-1 text-white/90">{item.description}</p>
              <p className="text-xs text-white/70 mt-3">Expires {item.expiryDate}</p>
            </div>

            <button className="relative z-10 flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5 hover:gap-3 transition-all">
              View Offers
              <img
                className="invert group-hover:translate-x-1 transition-all w-4"
                src={assets.arrowIcon}
                alt="arrow"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;