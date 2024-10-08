import React, { useState, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import logo1 from "../../../../assets/images/website_images/nayabLogo1.png";
import logo2 from "../../../../assets/images/website_images/nayabLogo2.png";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { HiOutlinePhone } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const ref = useRef();
  const products = useSelector((state) => state.reduxReducer.products);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowUser(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  // useEffect(() => {
  //   const filtered = paginationItems.filter((item) =>
  //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (to) => {
    setSidenav(false);
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
    <>
      {/* Top Notification Bar with Marquee */}
      <div className="w-full h-9 bg-[#7b246d] text-white text-center sm:text-sm xs:text-xs py-2 overflow-hidden group">
        <div className="flex space-x-4 min-w-[100%] animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center ">
          🎉 50% OFF SALE on selected items!&nbsp;
          <span className="cursor-pointer animate-blink font-bold">
            <Link to="/products" className="group-hover:text-white" >Shop now!</Link>
          </span>
        </div>
      </div>

      <div className="w-full h-16 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200 shadow-sm">
        <nav className="h-full px-4 max-w-container mx-auto relative flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center flex-grow">
            {/* Phone Number for Desktop View */}
            <HiOutlinePhone className="text-gray-600 w-7 h-5 mr-2 hidden md:block lg:block xl:block" />
            <a href="tel:+922136111685" className="text-md hidden md:block lg:block xl:block text-gray-600">
              +92(21)-23-456-789
            </a>

            {/* Mobile Menu Toggle */}
            <HiOutlineBars3BottomLeft onClick={() => setSidenav(!sidenav)} className="pr-2 block md:hidden cursor-pointer w-8 h-6 text-gray-600" />

            {/* Mobile Search Button */}
            <GoSearch onClick={() => setSidenav(!sidenav)} className="pr-2 block md:hidden lg:hidden xl:hidden cursor-pointer w-7 h-5 text-gray-600" />

            {/* Mobile Sidebar */}
            {sidenav && (
              <div
                className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50"
                onClick={() => setSidenav(false)}
              >
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[70%] h-screen relative bg-white shadow-xl rounded-r-3xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-full p-6 bg-gray-100 text-primeColor overflow-y-auto scrollbar-none">
                    {/* Close Icon */}
                    <span
                      onClick={() => setSidenav(false)}
                      className="absolute top-6 right-4 w-10 h-10 text-2xl flex justify-center items-center cursor-pointer text-gray-700 hover:bg-gray-300 transition duration-300"
                    >
                      <RxCross1 />
                    </span>

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                      <img className="w-28" src={logo1} alt="main_logo" />
                    </div>

                    {/* Search Bar (Mobile View) */}
                    <div className="relative mb-6">
                      <input
                        className="w-full h-9 px-4 rounded-full border border-gray-300 outline-none text-gray-800 placeholder:text-gray-400 focus:ring focus:ring-gray-400 transition"
                        type="text"
                        onChange={handleSearch}
                        value={searchQuery}
                        placeholder="Search products here"
                      />
                      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Navbar Menu */}
                    <ul className="flex flex-col gap-5 text-lg font-medium">
                      <li>
                        <Link
                          to="/"
                          className="relative block text-gray-700 font-light group cursor-pointer"
                          onClick={() => setSidenav(false)}
                        >
                          Home
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[15%]"></span>
                        </Link>
                      </li>

                      <li>
                        <ScrollLink
                          to="new-arrivals"
                          smooth={true}
                          duration={500}
                          offset={-50}
                          onClick={() => handleNavigation('new-arrivals')}
                          className="relative block text-gray-700 font-light group cursor-pointer"
                        >
                          New Arrivals
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                        </ScrollLink>
                      </li>

                      <li>
                        <ScrollLink
                          to="nayab-exclusive"
                          smooth={true}
                          duration={500}
                          offset={-50}
                          onClick={() => handleNavigation('nayab-exclusive')}
                          className="relative block text-gray-700 font-light group cursor-pointer"
                        >
                          Nayab Exclusive
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                        </ScrollLink>
                      </li>

                      <li>
                        <ScrollLink
                          to="special-offers"
                          smooth={true}
                          duration={500}
                          offset={-50}
                          onClick={() => handleNavigation('special-offers')}
                          className="relative block text-gray-700 font-light group cursor-pointer"
                        >
                          Special Offers
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                        </ScrollLink>
                      </li>

                      <li>
                        <Link
                          to="/products"
                          className="relative block text-gray-700 font-light group"
                          onClick={() => setSidenav(false)}
                        >
                          Explore Shop
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[15%]"></span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/products"
                          className="block text-[#e33939] font-light hover:text-red-700 pt-1 animate-blink"
                          onClick={() => setSidenav(false)}
                        >
                          Sale 30% Off
                        </Link>
                      </li>
                    </ul>

                    {/* Shop by Category - Advanced */}
                    {/* <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between items-center text-lg font-titleFont text-gray-700 hover:text-gray-500 cursor-pointer mb-2"
                      >
                        Shop by Category <span className="text-xl">{category ? "-" : "+"}</span>
                      </h1>

                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-1 text-sm"
                        >
                          {['Unstitched Collection', 'Stitched Collection', 'Saree Outfit', 'Nikkah Outfit', 'Lawn/Cotton', 'Mehndi Outfit'].map((item, index) => (
                            <li key={index} className="text-gray-700 hover:text-gray-500 cursor-pointer transition duration-300">
                              <Link to="/products">{item}</Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div> */}

                    {/* Shop by Category */}
                    <div className="mt-4">
                      <h1 onClick={() => setCategory(!category)} className="flex text-lg justify-between text-gray-700 cursor-pointer items-center font-titleFont mb-2">
                        Shop by Category <span className="text-xl">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1"
                        >
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Unstitched Collection
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Stitched Collection
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Saree Outfit
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Nikkah Outfit
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Lawn/Cotton
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                          <li className="relative block text-gray-700 font-light group text-[16px]">
                            <Link to="/products" onClick={() => setSidenav(false)}>
                              Mehndi Outfit
                              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img className="w-[50px] h-[50px] object-cover" src={logo2} alt="main_logo" /> {/* logo2 */}
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 justify-end flex-grow">
            {/* User Dropdown */}
            <div className="relative cursor-pointer" ref={ref}>
              <CiUser className="w-7 h-5 text-gray-700" onClick={() => setShowUser(!showUser)} />
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-44 z-50"
                >
                  <Link to="/signin">
                    <li className="px-4 py-2 hover:bg-gray-200">Login</li>
                  </Link>
                  <Link to="/signup">
                    <li className="px-4 py-2 hover:bg-gray-200">Sign Up</li>
                  </Link>
                </motion.ul>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <PiShoppingCartThin className="w-7 h-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#7b246d] text-white text-xs flex items-center justify-center rounded-full">
                {products.length > 0 ? products.length : 0}
              </span>
            </Link>
          </div>
        </nav>
      </div>

    </>
  );
};

export default Header;
