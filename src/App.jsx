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

  // FIX: false hardcoded tha — ab useState se properly control hoga
  const [showHotelReg, setShowHotelReg] = useState(false);

  return (
    // FIX: <div> → <> fragment use kiya (unnecessary wrapper hata diya)
    <>
      {/* Navbar — owner path par nahi dikhega */}
      {!isOwnerPath && <Navbar />}

      {/* FIX: HotelReg ab properly state se control ho raha hai */}
      {/* FIX: setShowHotelReg prop pass kiya taaki modal band ho sake */}
      {showHotelReg && (
        <HotelReg setShowHotelReg={setShowHotelReg} />
      )}

      {/* Main Content */}
      {/* FIX: min-h-[70vh] → min-h-screen (better layout) */}
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

      {/* FIX: Footer sirf non-owner pages par dikhega */}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;