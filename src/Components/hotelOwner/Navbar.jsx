import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-9 invert opacity-80 hover:opacity-100 transition-opacity"
        />
      </Link>

      {/* Right Section */}

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-medium text-gray-800">
              {user.fullName || user.firstName || "Hotel Owner"}
            </p>
            <p className="text-xs text-gray-500">Hotel Owner</p>
          </div>
        )}
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
