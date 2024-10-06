import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import logo1 from "../../../../assets/images/website_images/nayabLogo1.png";
import logo2 from "../../../../assets/images/website_images/nayabLogo2.png";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { HiOutlinePhone } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.reduxReducer.products);

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
  return (
    <>
      {/* Top Notification Bar with Marquee */}
      <div className="w-full h-9 bg-[#7b246d] text-white text-center sm:text-sm xs:text-xs py-2 overflow-hidden group">
        <div className="flex space-x-4 min-w-[100%] animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center ">
          🎉 50% OFF SALE on selected items!&nbsp;
          <span className="cursor-pointer animate-blink font-bold">
            <NavLink to="/products" className="group-hover:text-white" >Shop now!</NavLink>
          </span>
        </div>
      </div>

      <div className="w-full h-16 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
        <nav className="h-full px-4 max-w-container mx-auto relative flex items-center justify-between">
          {/* Left Section (Phone Number) */}
          <div className="flex items-center flex-grow">
            <HiOutlinePhone className="text-gray-600 mr-2 hidden md:block lg:block xl:block" />
            <a href="tel:+922136111685" className="text-sm hidden md:block lg:block xl:block text-gray-600">
              +92(21)-23-456-789
            </a>

            {/* Menu Toggle for Small Screens */}
            <HiMenuAlt2 onClick={() => setSidenav(!sidenav)} className="pr-2 block md:hidden lg:hidden xl:hidden cursor-pointer w-8 h-6 text-gray-600" />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="w-[80%] h-full relative">
                  <div className="w-full h-full bg-primeColor p-6">
                    <img className="w-28 mb-6" src={logo1} alt="main_logo" /> {/* logo1 */}
                    
                    {/* Search Bar (Mobile View) */}
                    <div className="relative mb-4">
                      <input
                        className="w-full h-8 px-4 rounded-xl border border-gray-400 outline-none placeholder:text-[#C4C4C4]"
                        type="text"
                        onChange={handleSearch}
                        value={searchQuery}
                        placeholder="Search products here"
                      />
                      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      {searchQuery && (
                        <div
                          className={`absolute top-full left-0 mt-2 w-full bg-white shadow-lg z-50 max-h-60 overflow-y-auto`}
                          ref={ref}
                        >
                          {filteredProducts.map((item) => (
                            <div key={item._id}
                              onClick={() => {
                                navigate(
                                  `/product/${item.productName.toLowerCase().replace(/\s+/g, '-')}`,
                                  { state: { item } }
                                );
                                setSearchQuery("");
                              }}
                              className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                            >
                              {/* <img className="w-20 h-20 object-cover" src={item.img} alt={item.productName} /> */}
                              <div className="ml-4">
                                <p className="font-semibold">{item.productName}</p>
                                <p className="text-sm text-gray-600">
                                  {item.des.length > 100 ? `${item.des.slice(0, 100)}...` : item.des}
                                </p>
                                <p className="text-sm font-semibold text-primeColor">${item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Navbar Menu */}
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Menu - Shop by category */}
                    <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                      >
                        Shop by Category{" "}
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-sm flex flex-col gap-1"
                        >
                          <li className="headerSedenavLi">Unstitched Collection</li>
                          <li className="headerSedenavLi">Stitched Collection</li>
                          <li className="headerSedenavLi">Saree Outfit</li>
                          <li className="headerSedenavLi">Nikkah Outfit</li>
                          <li className="headerSedenavLi">Lawn/Cotton</li>
                          <li className="headerSedenavLi">Mehndi Outfit</li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}

            {/* Search Icon for Small Screens */}
            <FaSearch onClick={() => setSidenav(!sidenav)} className="block md:hidden lg:hidden xl:hidden text-gray-600" />
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img className="lg:w-16 md:w-14 sm:w-14 xs:w-14 object-cover" src={logo2} alt="main_logo" /> {/* logo2 */}
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 flex-grow justify-end">
            {/* Search bar */}
            <div className="relative lg:w-[250px] md:hidden sm:hidden lg:flex items-center gap-2 border-b border-gray-300">
              <input
                className="flex-1 outline-none text-sm px-2 py-1"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search products here"
              />
              <FaSearch className="text-gray-500" />
            </div>

            {/* User Dropdown */}
            <div onClick={() => setShowUser(!showUser)} className="relative flex items-center cursor-pointer">
              <CiUser className="ml-[1px]" />
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-12 right-0 bg-white w-44 text-black z-50 rounded-md shadow-lg"
                >
                  <Link to="/signin">
                    <li className="px-4 py-2 border-b hover:bg-gray-200 cursor-pointer">Login</li>
                  </Link>
                  <Link to="/signup">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Sign Up</li>
                  </Link>
                </motion.ul>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <PiShoppingCartThin className="text-gray-700" />
              <span className="absolute font-titleFont -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-[#7b246d] text-white">
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
