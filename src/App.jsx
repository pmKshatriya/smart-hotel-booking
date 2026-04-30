import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import MyBookings from "./Pages/MyBookings";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/hotelOwner/Layout";
import Dashboard from "./Pages/hotelOwner/Dashboard";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import ListRoom from "./Pages/hotelOwner/ListRoom";

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");

  const [showHotelReg, setShowHotelReg] = useState(false);

  return (
    <>
      {!isOwnerPath && <Navbar />}

      {showHotelReg && <HotelReg setShowHotelReg={setShowHotelReg} />}

      {/* Main Content */}

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
