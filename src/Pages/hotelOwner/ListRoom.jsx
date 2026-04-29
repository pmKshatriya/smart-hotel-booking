import React, { useState } from "react";
import Title from "../../Components/Title";
import { roomsDummyData } from "../../assets/assets";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  const handleToggle = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId
          ? { ...room, isAvailable: !room.isAvailable }
          : room,
      ),
    );
  };

  return (
    <div className="px-6 py-8">
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8 font-medium">
        All Rooms
        <span className="ml-2 text-gray-400 text-sm">({rooms.length})</span>
      </p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-96 overflow-y-auto mt-3">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-left">
                Room
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left max-sm:hidden">
                Amenities
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left">
                Price / night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Available
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  No rooms listed yet
                </td>
              </tr>
            ) : (
              rooms.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.roomType}
                        className="h-12 w-16 rounded object-cover max-sm:hidden"
                      />
                      <span>{item.roomType}</span>
                    </div>
                  </td>

                  {/* Amenities */}
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    <span className="line-clamp-2">
                      {item.amenities.join(", ")}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    ${item.pricePerNight}
                  </td>

                  <td className="py-3 px-4 border-t border-gray-300 text-center">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                        onChange={() => handleToggle(item._id)}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200" />
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
