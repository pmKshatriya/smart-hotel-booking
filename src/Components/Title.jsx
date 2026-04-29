import React from 'react';

const Title = ({ title, subTitle, align, font }) => {
  return (
    // FIX: "justify-content" → "justify-center" (CSS property tha, Tailwind class nahi)
    <div
      className={`flex flex-col justify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>
        {title}
      </h1>
      {/* FIX: max-w-174 → max-w-2xl (valid Tailwind class) */}
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl'>
        {subTitle}
      </p>
    </div>
  );
};

export default Title;