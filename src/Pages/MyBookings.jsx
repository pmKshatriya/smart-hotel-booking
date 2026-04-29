import React, { useState } from "react";
import { assets, userBookingsDummyData } from "../assets/assets";
import Title from "../Components/Title";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  const handlePayNow = (bookingId) => {
    console.log("Pay Now clicked for booking:", bookingId);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b._id !== bookingId));
  };

  return (
    <div className="py-28 md:pb-32 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Page Title */}
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      {/* Bookings Table */}
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-xl font-medium">No bookings yet</p>
            <p className="text-sm mt-2">Your reservations will appear here</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
            >
              {/* Hotel Details */}
              <div className="flex flex-col md:flex-row gap-3">
                <img
                  src={booking.room.images[0]}
                  alt={booking.hotel.name}
                  className="md:w-44 h-28 rounded-lg shadow object-cover w-full"
                />
                <div className="flex flex-col gap-1.5 max-md:mt-1 md:ml-2">
                  <p className="font-playfair text-2xl">
                    {booking.hotel.name}

                    <span className="font-sans text-sm text-gray-500 ml-1">
                      ({booking.room.roomType})
                    </span>
                  </p>

                  {/* Address */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img
                      src={assets.locationIcon}
                      alt="location"
                      className="w-4 h-4"
                    />
                    <span>{booking.hotel.address}</span>
                  </div>

                  {/* Guests */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img
                      src={assets.guestsIcon}
                      alt="guests"
                      className="w-4 h-4"
                    />
                    <span>Guests: {booking.guests}</span>
                  </div>

                  {/* Total Price */}
                  <p className="text-base font-medium">
                    Total: ${booking.totalPrice}
                  </p>

                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors text-left w-fit mt-1 cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>

              {/* Date & Timings */}
              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p className="font-medium text-sm">Check-In</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">Check-Out</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex flex-col items-start justify-center pt-3 gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      booking.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <p
                    className={`text-sm font-medium ${
                      booking.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>

                {!booking.isPaid && (
                  <button
                    onClick={() => handlePayNow(booking._id)}
                    className="px-4 py-1.5 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
