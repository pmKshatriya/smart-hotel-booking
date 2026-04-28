import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

/* ---------------- ICON ---------------- */
const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

/* ---------------- NAVBAR ---------------- */
const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between 
      px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50
      ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6 text-white"
      }`}
    >
      {/* ---------------- LOGO ---------------- */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-10 ${isScrolled ? "invert opacity-80" : ""}`}
        />
      </Link>

      {/* ---------------- DESKTOP NAV ---------------- */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="group flex flex-col gap-0.5"
          >
            {link.name}
            <div className="h-0.5 w-0 group-hover:w-full bg-current transition-all duration-300" />
          </Link>
        ))}

        <button
          onClick={() => navigate("/owner")}
          className={`border px-4 py-1 text-sm rounded-full transition ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* ---------------- DESKTOP RIGHT ---------------- */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`${isScrolled ? "invert" : ""} h-7 transition-all duration-500`}
        />

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition ${
              isScrolled ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* ---------------- MOBILE BUTTON ---------------- */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="menu"
          className={`h-4 ${isScrolled ? "invert" : ""}`}
        />
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col
        items-center justify-center gap-6 md:hidden transition-all duration-500
        z-[999]
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6.5" />
        </button>

        {/* Nav Links */}
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="text-gray-800 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        {/* Dashboard Button - only for logged in users */}
        {user && (
          <button
            onClick={() => {
              navigate("/owner")
              setIsMenuOpen(false)
            }}
            className="border px-4 py-1 text-sm rounded-full text-black"
          >
            Dashboard
          </button>
        )}

        {/* Login Button - only for logged out users */}
        {!user && (
          <button
            onClick={() => {
              openSignIn()
              setIsMenuOpen(false)
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Login
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;