import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomsDummyData,
  roomCommonData,
} from "../assets/assets";
import StarRating from "../Components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bookingData = {
      roomId: id,
      checkIn: formData.get("checkInDate"),
      checkOut: formData.get("checkOutDate"),
      guests: formData.get("guests"),
    };
    console.log("Booking Data:", bookingData);
  };

  return (
    room && (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-sans text-sm text-gray-600">
              ({room.roomType})
            </span>
          </h1>
          <p className="text-xs font-sans py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}

        <div className="flex items-center gap-1 mt-2">
          <StarRating rating={room.rating ?? 4} />
          <p className="ml-2 text-sm text-gray-500">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span className="text-sm">{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          {/* Main Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt={room.hotel.name}
              className="w-full rounded-xl shadow-lg object-cover h-72 lg:h-96"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt={`Room view ${index + 1}`}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer h-32 lg:h-44 transition-all ${
                    mainImage === image
                      ? "outline outline-2 outline-orange-500"
                      : "hover:opacity-90"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h2>

            {/* Amenities */}
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
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
          </div>

          {/* Room Price */}
          <p className="text-2xl font-medium shrink-0">
            ${room.pricePerNight}
            <span className="text-base font-normal text-gray-500">/night</span>
          </p>
        </div>

        {/* CheckIn CheckOut Form */}

        <form
          onSubmit={handleBooking}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl gap-6"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-8 text-gray-500 w-full">
            {/* Check-In */}
            <div>
              <label
                htmlFor="checkInDate"
                className="font-medium text-gray-700"
              >
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-indigo-400"
                required
              />
            </div>

            {/* Divider */}

            <div className="w-px h-14 bg-gray-300/70 max-md:hidden" />

            {/* Check-Out */}
            <div>
              <label
                htmlFor="checkOutDate"
                className="font-medium text-gray-700"
              >
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                name="checkOutDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-indigo-400"
                required
              />
            </div>

            {/* Divider */}
            <div className="w-px h-14 bg-gray-300/70 max-md:hidden" />

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="font-medium text-gray-700">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                placeholder="1"
                min="1"
                max="4"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-indigo-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded-lg max-md:w-full max-md:mt-2 md:px-10 py-3 md:py-4 text-base cursor-pointer whitespace-nowrap"
          >
            Check Availability
          </button>
        </form>

        {/* Common Specifications */}

        <div className="mt-20 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={spec.icon}
                alt={spec.title}
                className="w-6 h-6 mt-0.5"
              />
              <div>
                <p className="text-base font-medium">{spec.title}</p>
                <p className="text-gray-500 text-sm">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}

        <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500 text-sm leading-relaxed">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable two bedroom apartment that has a
            true city feeling. The price quoted is for two guests — at the guest
            slot please mark the number of guests to get the exact price for
            groups. The guests will be allocated ground floor according to
            availability.
          </p>
        </div>

        {/* Hosted By */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4 items-center">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
            />
            <div>
              <p className="text-lg md:text-xl font-medium">
                Hosted by {room.hotel.name}
              </p>

              <div className="flex items-center mt-1 gap-2">
                <StarRating rating={room.rating ?? 4} />
                <p className="text-sm text-gray-500">200+ reviews</p>
              </div>
            </div>
          </div>

          <button className="px-6 py-2.5 mt-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
