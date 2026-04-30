import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-20 bg-gray-900 text-white">
      <Title
        title="Stay Inspired"
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers and travel inspiration."
      />

      {subscribed ? (
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-green-400 font-medium text-lg">
            ✓ You're subscribed!
          </p>
          <p className="text-gray-400 text-sm">
            Thank you for joining us. Stay tuned for updates.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-64 w-full placeholder-white/50 focus:border-white/50 transition-colors"
            placeholder="Enter your email"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 group bg-black hover:bg-gray-800 px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all cursor-pointer border border-white/10"
          >
            Subscribe
            <img
              src={assets.arrowIcon}
              alt="arrow"
              className="w-3.5 invert group-hover:translate-x-1 transition-all"
            />
          </button>
        </form>
      )}

      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our{" "}
        <span className="underline cursor-pointer hover:text-gray-300 transition-colors">
          Privacy Policy
        </span>{" "}
        and consent to receive updates.
      </p>
    </div>
  );
};

export default NewsLetter;
