import React, { useState, useEffect } from "react";
import Title from "../../Components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  useEffect(() => {
    // TODO: API call yahan lagao real data ke liye
    setDashboardData(dashboardDummyData);
  }, []);

  return (
    <div className="px-6 py-8">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Stats Cards */}

      <div className="flex flex-wrap gap-4 my-8">
        {/* Total Bookings */}

        <div className="bg-blue-50 border border-blue-100 rounded-xl flex items-center p-4 pr-8 gap-4 min-w-[180px]">
          <img
            src={assets.totalBookingIcon}
            alt="total bookings icon"
            className="max-sm:hidden h-10 w-10"
          />
          <div className="flex flex-col font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-2xl font-semibold">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl flex items-center p-4 pr-8 gap-4 min-w-[180px]">
          <img
            src={assets.totalRevenueIcon}
            alt="total revenue icon"
            className="max-sm:hidden h-10 w-10"
          />
          <div className="flex flex-col font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-2xl font-semibold">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-left">
                User Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left max-sm:hidden">
                Room Type
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  No bookings yet
                </td>
              </tr>
            ) : (
              dashboardData.bookings.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.user.username}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {item.room.roomType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    ${item.totalPrice}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-300">
                    <div className="flex justify-center">
                      <span
                        className={`py-1 px-3 text-xs rounded-full ${
                          item.isPaid
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {item.isPaid ? "Completed" : "Pending"}
                      </span>
                    </div>
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

export default Dashboard;
