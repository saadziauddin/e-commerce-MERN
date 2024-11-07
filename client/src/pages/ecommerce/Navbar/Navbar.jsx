import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SlEnvolope, SlPhone } from "react-icons/sl";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { PK, US, GB, TR, OM, AE, SA, QA, CA, EU, AU, BD, HK, TH, NZ } from 'country-flag-icons/react/3x2';
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from "/Images/NayabLogo.png";
import api from "../../../api/api";
import MobileSidebar from "./MobileSidebar";

const Navbar = ({ onCurrencyChange }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [currency, setCurrency] = useState('PKR');
  const [sidenav, setSidenav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const products = useSelector((state) => state.reduxReducer.products);
  const [isOpen, setIsOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const currencyRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  const flagComponents = {
    PKR: <PK className="inline-block w-5 h-5 mr-2" />,
    USD: <US className="inline-block w-5 h-5 mr-2" />,
    AED: <AE className="inline-block w-5 h-5 mr-2" />,
    SAR: <SA className="inline-block w-5 h-5 mr-2" />,
    OMR: <OM className="inline-block w-5 h-5 mr-2" />,
    TRY: <TR className="inline-block w-5 h-5 mr-2" />,
    GBP: <GB className="inline-block w-5 h-5 mr-2" />,
    QAR: <QA className="inline-block w-5 h-5 mr-2" />,
    CAD: <CA className="inline-block w-5 h-5 mr-2" />,
    EUR: <EU className="inline-block w-5 h-5 mr-2" />,
    AUD: <AU className="inline-block w-5 h-5 mr-2" />,
    BDT: <BD className="inline-block w-5 h-5 mr-2" />,
    HKD: <HK className="inline-block w-5 h-5 mr-2" />,
    THB: <TH className="inline-block w-5 h-5 mr-2" />,
    NZD: <NZ className="inline-block w-5 h-5 mr-2" />
  };

  const currencies = [
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "USD", name: "US Dollar" },
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "OMR", name: "Omani Rial" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "GBP", name: "British Pound" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "NZD", name: "New Zealand Dollar" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUser(false);
      }
    };
    document.body.addEventListener("mousedown", handleClickOutside);
    // document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currencyRef, userRef]);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    onCurrencyChange(selectedCurrency);
    setIsOpen(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        // Call your search API here
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const userImage = userInfo?.image
    ? `${apiUrl}/uploads/user_images/${userInfo.image}`
    : `${apiUrl}/default_images/default_profile.png`;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserInfo(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.get('/api/logout');
      localStorage.removeItem("user");
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Top Announcement Bars */}
      {/* <div className="w-full xs:h-6 sm:h-6 md:h-8 lg:h-8 xl:h-8 xs:text-xs sm:text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] font-titleFont bg-[#aa2f95] text-gray-200 text-center xs:py-1 sm:py-1 md:py-2 lg:py-2 xl:py-2 group">
        <p className="flex min-w-[100%] animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center cursor-pointer">
          🎉 50% OFF SALE on selected items!&nbsp; 
          <span className="cursor-pointer animate-blink font-bold group-hover:animate-none">
            <Link to="/products" className="group-hover:text-white">Shop now!</Link>
          </span>
        </p>
      </div> */}
      <div className="w-full h-8 xs:h-6 sm:h-6 md:h-8 lg:h-8 xl:h-8 xs:text-xs sm:text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] font-titleFont bg-gray-800 text-gray-200 text-center xs:py-1 sm:py-1 md:py-2 lg:py-2 xl:py-2 group overflow-hidden">
        <p className="flex min-w-[100%] animate-marquee group-hover:pause-marquee whitespace-nowrap group-hover:animate-none group-hover:justify-center cursor-pointer">
          {/* Welcome to your dream closet🌸 Enjoy free delivery in Pakistan&nbsp;{flagComponents.PKR} */}
          Nayab Fashion is Pakistan's No.1 TRUSTED Women's Clothing Store.
        </p>
      </div>
      <div className="w-full h-[35px] bg-gray-200 text-gray-900 py-1 md:px-12 flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-2 ml-4 md:ml-10">
          <SlEnvolope className="xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-600" />
          <a href="mailto:info@nayabfashion.com" target="_blank" className="xs:text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm text-gray-700">
            info@nayabfashion.com
          </a>
        </div>

        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-6 mr-4 md:mr-10">
          <div className="flex items-center">
            <SlPhone className="xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-600" />
            <a href="tel:+923100122349" className="pl-2 xs:text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm text-gray-700 hover:text-gray-900">
              +92-310-0122349
            </a>
          </div>
          {/* <div className="flex items-center">
            <SlPhone className="xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-600" />
            <a href="tel:+923100122349" className="pl-2 xs:text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm text-gray-700 hover:text-gray-900">
              +92-310-0122349
            </a>
          </div> */}
        </div>
      </div>

      {/* Navbar */}
      <div className="w-full h-[70px] bg-white sticky top-0 z-[80] border-b border-b-gray-200">
        <nav className="relative flex justify-between items-center h-full px-4 max-w-container mx-auto">
          {/* Left Section */}
          <div className="flex items-center flex-grow">
            <div className="hidden md:flex relative w-full">
              <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="h-8 pl-12 pr-4 border-b border-gray-300 outline-none text-gray-800 placeholder-gray-500 placeholder:text-sm focus:ring-0 focus:border-gray-500 transition-all"
                placeholder="Search products, categories..."
              />
            </div>

            {/* Mobile Settings */}
            <HiOutlineBars3BottomLeft className="block md:hidden h-6 w-8 text-gray-700" onClick={() => setSidenav(!sidenav)} />
            <GoSearch className="block md:hidden h-5 w-8 text-gray-700" onClick={() => setSidenav(!sidenav)} />

            <MobileSidebar
              sidenav={sidenav}
              setSidenav={setSidenav}
              handleSearch={(e) => setSearchQuery(e.target.value)}
              searchQuery={searchQuery}
              logo={logo}
            />
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img src={logo} alt="Nayab Logo" className="w-[150px] h-[50px]" />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex flex-grow relative gap-1 items-center justify-end">
            {/* Currency Dropdown */}
            <div className="relative" onClick={() => { setIsOpen(!isOpen); }} ref={currencyRef}>
              <div className="flex items-center p-1 border rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                {flagComponents[currency]}
                <span className="hidden md:inline">{currency}</span>
                <RiArrowDropDownLine className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto  md:scrollbar-none">
                  {currencies.map((curr) => (
                    <div key={curr.code} className="flex items-center p-2 w-full border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleCurrencyChange({ target: { value: curr.code } })}>
                      <div className="flex items-center justify-center w-10 h-8">
                        {flagComponents[curr.code]}
                      </div>
                      <span className="ml-2">{curr.code} - {curr.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative hidden md:block cursor-pointer" onClick={() => { setShowUser(!showUser); }} ref={userRef}>
              <div className="flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-100 transition-colors duration-200">
                {userInfo ? (
                  <img src={userImage} alt="User Profile" className="w-6 h-6 rounded-full" />
                ) : (
                  <CiUser className="w-6 h-6 text-gray-700" />
                )}
              </div>
              {showUser && (
                <div className="absolute top-full right-0 mt-3 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                  {userInfo ? (
                    <>
                      <div
                        className="flex items-center px-3 py-2 w-full border-b hover:bg-gray-100 cursor-pointer"
                      // onClick={handleEditProfile}
                      >
                        <span className="ml-2">Edit Profile</span>
                      </div>
                      <Link to="/dashboard/manage-orders">
                        <div className="flex items-center px-3 py-2 w-full border-b hover:bg-gray-100 cursor-pointer">
                          <span className="ml-2">Manage Orders</span>
                        </div>
                      </Link>
                      <div
                        className="flex items-center px-3 py-2 w-full hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <span className="ml-2">Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/signin">
                        <div className="flex items-center px-3 py-2 w-full border-b hover:bg-gray-100 cursor-pointer">
                          <span className="ml-2">Sign In</span>
                        </div>
                      </Link>
                      <Link to="/signup">
                        <div className="flex items-center px-3 py-2 w-full hover:bg-gray-100 cursor-pointer">
                          <span className="ml-2">Sign Up</span>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center p-1 rounded-md hover:bg-gray-100 transition-colors duration-200">
              <PiShoppingCartThin className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#7b246d] text-white text-xs flex items-center justify-center rounded-full shadow-md">
                {products.length > 0 ? products.length : 0}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
