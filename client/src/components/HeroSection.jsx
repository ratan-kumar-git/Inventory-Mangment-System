import React from "react";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.png";

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 xl:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="text-center xl:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Smart, Simple, and <br className="hidden sm:inline" />
            <span className="text-sky-500">Seamless Inventory Management</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Stay ahead of your stock levels with a system designed for clarity
            and control. From tracking to reporting — everything you need to run
            your business efficiently, in one dashboard.
          </p>

          {/* Call-to-actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">
          <img
            src={homeImg}
            alt="Inventory dashboard preview"
            className="max-h-96 rounded-xl shadow-lg ring-1 ring-gray-200"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
