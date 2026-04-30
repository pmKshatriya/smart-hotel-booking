import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Brand Section */}
        <div className="max-w-80">
          <img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-8 md:h-9 invert opacity-80"
          />

          <p className="text-sm">
            Discover the most extraordinary places to stay, from boutique hotels
            to luxury villas and private islands.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={assets.instagramIcon} alt="instagram" className="w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={assets.facebookIcon} alt="facebook" className="w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={assets.twitterIcon} alt="twitter" className="w-6" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={assets.linkendinIcon} alt="linkedin" className="w-6" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-playfair text-lg text-gray-800">COMPANY</p>

          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-gray-700 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="hover:text-gray-700 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/press"
                className="hover:text-gray-700 transition-colors"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-gray-700 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/partners"
                className="hover:text-gray-700 transition-colors"
              >
                Partners
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="font-playfair text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                to="/help"
                className="hover:text-gray-700 transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/safety"
                className="hover:text-gray-700 transition-colors"
              >
                Safety Information
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation"
                className="hover:text-gray-700 transition-colors"
              >
                Cancellation Options
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-700 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/accessibility"
                className="hover:text-gray-700 transition-colors"
              >
                Accessibility
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>

          {subscribed ? (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none text-sm flex-1"
                placeholder="Your email"
                required
              />

              <button
                type="submit"
                className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <img
                  src={assets.arrowIcon}
                  alt="subscribe"
                  className="w-3.5 invert"
                />
              </button>
            </form>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mt-8" />

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Ripple Resort. All rights reserved.</p>
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <Link
              to="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-gray-700 transition-colors">
              Terms
            </Link>
          </li>
          <li>
            <Link
              to="/sitemap"
              className="hover:text-gray-700 transition-colors"
            >
              Sitemap
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
