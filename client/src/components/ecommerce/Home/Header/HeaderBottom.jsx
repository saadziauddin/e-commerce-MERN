import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const HeaderBottom = () => {
  const navigate = useNavigate();

  const handleNavigation = (to) => {
    navigate('/');
    setTimeout(() => {
      // Scroll to the specific section after a short delay
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Adjust the timeout if necessary
  };

  return (
    <div className="w-full h-5 bg-white mt-4">
      <div className="max-w-container mx-auto">
        {/* Main Nav Items */}
        <div className="hidden md:flex justify-center items-center px-4">
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <Link
              to="/"
              className="relative uppercase text-[16px] text-gray-800 font-thin group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </Link>

            <ScrollLink
              to="new-arrivals"
              smooth={true}
              duration={500}
              offset={-50}
              onClick={() => handleNavigation('new-arrivals')}
              className="relative uppercase text-[16px] text-gray-800 font-thin group cursor-pointer"
            >
              New Arrivals
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </ScrollLink>

            <ScrollLink
              to="nayab-exclusive"
              smooth={true}
              duration={500}
              offset={-50}
              onClick={() => handleNavigation('nayab-exclusive')}
              className="relative uppercase text-[16px] text-gray-800 font-thin group cursor-pointer"
            >
              Nayab Exclusive
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </ScrollLink>

            <ScrollLink
              to="special-offers"
              smooth={true}
              duration={500}
              offset={-50}
              onClick={() => handleNavigation('special-offers')}
              className="relative uppercase text-[16px] text-gray-800 font-thin group cursor-pointer"
            >
              Special Offers
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </ScrollLink>

            <Link
              to="/products"
              className="relative uppercase text-[16px] text-gray-800 font-thin group hover:text-gray-600"
            >
              Explore Shop
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </Link>

            <Link
              to="/products"
              className="relative uppercase text-[16px] text-red-600 font-thin group animate-blink"
            >
              Sale 30% Off
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[75%]"></span>
            </Link>
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
