import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const HeaderBottom = () => {

  return (
    // border-b
    <div className="w-full h-5 bg-white mt-3">
      <div className="max-w-container mx-auto">
        {/* Main Nav Items */}
        <div className="hidden md:flex justify-center items-center py-2 px-4">
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            {/* Menu items */}
            <NavLink to="/" className="uppercase text-md text-black font-bodyFont">
              Home
            </NavLink>
            <NavLink to="/products" className="uppercase text-md text-black font-bodyFont hover:text-gray-600">
              New Arrivals
            </NavLink>
            <NavLink to="/products" className="uppercase text-md text-black font-bodyFont hover:text-gray-600">
              Top Selling
            </NavLink>
            <NavLink to="/products" className="uppercase text-md text-black font-bodyFont hover:text-gray-600">
              Women
            </NavLink>
            <NavLink to="/products" className="uppercase text-md text-black font-bodyFont hover:text-gray-600">
              About Us
            </NavLink>
            <NavLink to="/products" className="uppercase text-md text-[#ff5c5c] font-bodyFont animate-blink">
              <span>Sale 30% Off</span>
            </NavLink>
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
