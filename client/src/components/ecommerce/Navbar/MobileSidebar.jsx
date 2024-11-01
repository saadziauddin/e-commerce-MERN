import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { FaSearch, FaSignInAlt, FaUserPlus, FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ScrollLink } from "react-scroll";

const MobileSidebar = ({ sidenav, setSidenav, categories, handleCategoryClick, handleSearch, searchQuery, logo }) => {
    return (
        <>
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
                            <span className="absolute top-6 right-4 w-10 h-10 text-2xl flex justify-center items-center cursor-pointer text-gray-700 hover:bg-gray-300 transition duration-300" onClick={() => setSidenav(false)}>
                                <RxCross1 />
                            </span>

                            {/* Logo */}
                            <div className="flex justify-center mb-6">
                                <Link to='/'>
                                    <img className="w-36" src={logo} alt="Nayab Logo" />
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
                                    <Link to="/" className="relative block text-gray-700 font-light group cursor-pointer" onClick={() => setSidenav(false)}>
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
        </>
    );
};

export default MobileSidebar;
