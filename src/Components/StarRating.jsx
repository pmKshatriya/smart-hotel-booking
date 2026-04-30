import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating }) => {
  const starCount = rating ?? 4;

  return (
    <div className="flex items-center gap-0.5">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              starCount > index
                ? assets.starIconFilled
                : assets.starIconOutlined
            }
            alt={starCount > index ? "filled star" : "empty star"}
            className="w-4 h-4"
          />
        ))}
    </div>
  );
};

export default StarRating;
