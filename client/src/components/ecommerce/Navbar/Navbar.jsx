import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logo from "/Images/NayabLogo.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Link as ScrollLink } from "react-scroll";
// Icons
import { SlEnvolope } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaSearch, FaSignInAlt, FaUserPlus, FaFacebook, FaYoutube, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { PK, US, GB, TR, OM, AE, SA } from 'country-flag-icons/react/3x2';
import api from "../../../api/api";

const Navbar = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState('PKR');
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef();
  const products = useSelector((state) => state.reduxReducer.products);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/fetchOnlyRequiredCategories');
        setCategories(response.data);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    setSidenav(false);
    navigate(`/products?category=${categoryName}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

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

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(e.target.value);
    onCurrencyChange(selectedCurrency);
    setIsOpen(false);
  };

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

  const handleSignIn = () => {
    navigate('/signin');
  }

  const flagComponents = {
    PKR: <PK className="inline-block w-5 h-5 mr-2" />,
    USD: <US className="inline-block w-5 h-5 mr-2" />,
    AED: <AE className="inline-block w-5 h-5 mr-2" />,
    SAR: <SA className="inline-block w-5 h-5 mr-2" />,
    OMR: <OM className="inline-block w-5 h-5 mr-2" />,
    TRY: <TR className="inline-block w-5 h-5 mr-2" />,
    GBP: <GB className="inline-block w-5 h-5 mr-2" />
  };

  const currencies = [
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "USD", name: "US Dollar" },
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "OMR", name: "Omani Rial" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "GBP", name: "British Pound" }
  ];

  return (
    <>
      {/* Top Notification Bar with Marquee */}
      {/* <div className="w-full h-9 bg-[#7b246d] text-white text-center sm:text-sm xs:text-xs py-2 overflow-hidden group">
        <div className="flex space-x-4 min-w-[100%] animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center cursor-pointer">
          🎉 50% OFF SALE on selected items!&nbsp;
          <span className="cursor-pointer animate-blink font-bold group-hover:animate-none ">
            <Link to="/products" className="group-hover:text-white">Shop now!</Link>
          </span>
        </div>
      </div> */}

      {/* First top banner with shipping info */}
      <div className="w-full h-10 xs:text-xs sm:text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] bg-black text-gray-200 text-center flex justify-center items-center py-3 font-titleFont">
        <p className="animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center">
          Welcome to your dream closet🌸 Enjoy free delivery in Pakistan&nbsp;{flagComponents.PKR}
        </p>
      </div>

      {/* Second top banner with phone nos. and email */}
      <div className="w-full h-[50px] bg-gray-200 text-gray-900 py-2 md:px-6 flex justify-between items-center text-md">
        <div className="flex items-center space-x-2 ml-4 md:ml-10">
          <SlEnvolope className="xs:text-sm sm:text-sm md:text-md lg:text-md xl:text-md text-gray-600" />
          <a href="mailto:info@nayabfashion.com" target="_blank" className="xs:text-sm sm:text-sm md:text-md lg:text-md xl:text-md text-gray-700">
            info@nayabfashion.com
          </a>
        </div>

        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-6 mr-4 md:mr-10 md:mt-0">
          <div className="flex items-center">
            <SlPhone className="xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-600" />
            <a href="tel:+922136111685" className="pl-2 xs:text-xs sm:text-xs md:text-md lg:text-md xl:text-md text-gray-700 hover:text-gray-900">
              +92(21)-23-456-789
            </a>
          </div>
          {/* <div className="flex items-center">
            <SlPhone className="xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-600" />
            <a href="tel:+922136111685" className="pl-2 xs:text-sm sm:text-sm md:text-md lg:text-md xl:text-md text-gray-700 hover:text-gray-900">
              +92(21)-23-456-789
            </a>
          </div> */}
        </div>
      </div>

      <div className="w-full h-16 bg-white sticky top-0 z-[70] border-b border-b-gray-200">
        <nav className="h-full px-4 max-w-container mx-auto relative flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center flex-grow">
            {/* Search Bar */}
            <div className="hidden md:flex w-full relative">
              <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer" />
              <input
                className="h-8 pl-12 pr-4 border-b border-gray-300 outline-none text-gray-800 placeholder-gray-500 placeholder:text-sm focus:ring-0 focus:border-gray-500 transition-all shadow-sm"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search products, categories..."
              />
            </div>

            {/* Mobile Menu Toggle */}
            <HiOutlineBars3BottomLeft onClick={() => setSidenav(!sidenav)} className="pr-2 block md:hidden lg:hidden xl:hidden cursor-pointer w-8 h-6 text-gray-600" />

            {/* Mobile Search Icon */}
            <GoSearch onClick={() => setSidenav(!sidenav)} className="pr-2 block md:hidden lg:hidden xl:hidden cursor-pointer w-7 h-5 text-gray-600" />

            {/* Mobile Sidebar */}
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50" onClick={() => setSidenav(false)} >
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[70%] h-screen relative bg-white shadow-xl rounded-r-3xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="h-full p-6 bg-gray-100 text-primeColor overflow-y-auto scrollbar-none">
                    {/* Close Icon */}
                    <span
                      onClick={() => setSidenav(false)}
                      className="absolute top-6 right-4 w-10 h-10 text-2xl flex justify-center items-center cursor-pointer text-gray-700 hover:bg-gray-300 transition duration-300"
                    >
                      <RxCross1 />
                    </span>

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                      <Link to='/'>
                        <img className="w-36" src={logo} alt="main_logo" />
                      </Link>
                    </div>

                    {/* Search Bar */}
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

                    {/* Shop by Category */}
                    <div className="mt-4">
                      <h1 className="flex text-lg justify-between text-gray-700 cursor-pointer items-center font-titleFont mb-2">
                        Categories
                        {/* onClick={() => setCategory(!category)} <span className="text-xl">{category ? "-" : "+"}</span> */}
                      </h1>
                      {/* {category && ( */}
                      {categories.length > 0 ? (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1"
                        >
                          {categories.map((category) => (
                            <li key={category.id} className="relative block text-gray-700 font-light group text-[16px]">
                              <Button
                                onClick={() => {
                                  handleCategoryClick(category.id, category.name);
                                  setSidenav(false);
                                }}
                              >
                                {category.name}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-[30%]"></span>
                              </Button>
                            </li>
                          ))}
                        </motion.ul>
                      ) : (
                        <div className="px-4 py-2 text-gray-700">No Categories</div>
                      )}
                    </div>

                    {/* Sign In and Sign Up Links with Icons */}
                    <div className="mt-6 flex flex-col gap-4">
                      <Link
                        to="/signin"
                        className="flex items-center text-gray-700 font-semibold font-heading hover:text-gray-500 transition duration-300"
                        onClick={() => setSidenav(false)}
                      >
                        <FaSignInAlt className="mr-2" /> Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center text-gray-700 font-semibold font-heading hover:text-gray-500 transition duration-300"
                        onClick={() => setSidenav(false)}
                      >
                        <FaUserPlus className="mr-2" /> Create Account
                      </Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="mt-8">
                      <ul className="flex items-center gap-3 justify-center md:gap-4">
                        <a href="https://wa.me/+923100122349" target="_blank" rel="noreferrer">
                          <li className="w-8 h-8 bg-green-500 text-white cursor-pointer text-xl rounded-full flex justify-center items-center hover:bg-green-400 duration-300 md:w-10 md:h-10 md:text-2xl">
                            <FaWhatsapp />
                          </li>
                        </a>
                        <a href="https://www.facebook.com/Nayabonlinestore/" target="_blank" rel="noreferrer">
                          <li className="w-8 h-8 bg-blue-600 text-white cursor-pointer text-xl rounded-full flex justify-center items-center hover:bg-blue-500 duration-300 md:w-10 md:h-10 md:text-2xl">
                            <FaFacebook />
                          </li>
                        </a>
                        <a href="https://www.instagram.com/nayab_fashion_" target="_blank" rel="noreferrer">
                          <li className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white cursor-pointer text-xl rounded-full flex justify-center items-center hover:bg-gradient-to-tr duration-300 md:w-10 md:h-10 md:text-2xl">
                            <FaInstagram />
                          </li>
                        </a>
                        <a href="https://www.tiktok.com/@nayabfashion" target="_blank" rel="noreferrer">
                          <li className="w-8 h-8 bg-black text-white cursor-pointer text-xl rounded-full flex justify-center items-center hover:bg-gray-800 duration-300 md:w-10 md:h-10 md:text-2xl">
                            <FaTiktok />
                          </li>
                        </a>
                        <a href="https://youtube.com/@nayabfashion" target="_blank" rel="noreferrer">
                          <li className="w-8 h-8 bg-red-600 text-white cursor-pointer text-xl rounded-full flex justify-center items-center hover:bg-red-500 duration-300 md:w-10 md:h-10 md:text-2xl">
                            <FaYoutube />
                          </li>
                        </a>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img className="w-[150px] h-[50px] object-cover" src={logo} alt="main_logo" />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 justify-end flex-grow">
            {/* Currency Dropdown */}
            <div className="relative" ref={ref}>
              <div className="flex w-full items-center cursor-pointer border border-gray-300 p-[3px] md:p-[5px] lg:p-[5px] xl:p-[5px] rounded-md bg-white"
                onClick={() => setIsOpen(!isOpen)}
                // onMouseEnter={() => setIsOpen(true)}
                // onClick={() => {
                //   if (window.innerWidth <= 768) {
                //     setIsOpen(!isOpen); // Toggle on mobile
                //   }
                // }}
                // onMouseEnter={() => {
                //   if (window.innerWidth > 768) {
                //     setIsOpen(true); // Open on hover for larger screens
                //   }
                // }}
              >
                {flagComponents[currency]}
                <span className="hidden md:block lg:block xl:block">{currency}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="absolute top-full right-0 z-10 mt-1 w-60 bg-white border border-gray-300 rounded-md shadow-lg">
                  {currencies.map((curr) => (
                    <div
                      key={curr.code}
                      className="flex items-center p-2 w-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencyChange({ target: { value: curr.code } })}
                    >
                      <div className="flex items-center justify-center w-10 h-8">{flagComponents[curr.code]}</div>
                      <span className="ml-2">{curr.code} - {curr.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative hidden md:block lg:block xl:block cursor-pointer" ref={ref}>
              <CiUser className="w-8 h-6 text-gray-700" onClick={handleSignIn} />
              {/* {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-44 z-50"
                >
                  <Link to="/signin">
                    <li className="px-4 py-2 hover:bg-gray-200 border-b">Sign In</li>
                  </Link>
                  <Link to="/signup">
                    <li className="px-4 py-2 hover:bg-gray-200">Sign Up</li>
                  </Link>
                </motion.ul>
              )} */}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <PiShoppingCartThin className="w-8 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#7b246d] text-white text-xs flex items-center justify-center rounded-full">
                {products.length > 0 ? products.length : 0}
              </span>
            </Link>
          </div>
        </nav >
      </div >
    </>
  );
};

export default Navbar;
