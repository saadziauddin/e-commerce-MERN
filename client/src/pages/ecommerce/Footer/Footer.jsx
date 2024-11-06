import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import paymentCard from "/Images/Payment.png";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  const handleNavigation = (to) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">More about Nayab Fashion</h3>
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <ul className="flex items-center gap-4">
              <a href="https://wa.me/+923100122349" target="_blank" rel="noreferrer">
                <li className="w-10 h-10 bg-green-500 text-white cursor-pointer text-2xl rounded-full flex justify-center items-center hover:bg-green-400 duration-300">
                  <FaWhatsapp />
                </li>
              </a>
              <a href="https://www.facebook.com/Nayabonlinestore/" target="_blank" rel="noreferrer">
                <li className="w-10 h-10 bg-blue-600 text-white cursor-pointer text-2xl rounded-full flex justify-center items-center hover:bg-blue-500 duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a href="https://www.instagram.com/nayab_fashion_" target="_blank" rel="noreferrer">
                <li className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white cursor-pointer text-2xl rounded-full flex justify-center items-center hover:bg-gradient-to-tr duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a href="https://www.tiktok.com/@nayabfashion" target="_blank" rel="noreferrer">
                <li className="w-10 h-10 bg-black text-white cursor-pointer text-2xl rounded-full flex justify-center items-center hover:bg-gray-800 duration-300">
                  <FaTiktok />
                </li>
              </a>
              <a href="https://youtube.com/@nayabfashion" target="_blank" rel="noreferrer">
                <li className="w-10 h-10 bg-red-600 text-white cursor-pointer text-2xl rounded-full flex justify-center items-center hover:bg-red-500 duration-300">
                  <FaYoutube />
                </li>
              </a>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Navigation Links</h3>
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to='/'>Home</Link>
            </li>

            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <ScrollLink
                to="new-arrivals"
                smooth={true}
                duration={500}
                offset={-50}
                onClick={() => handleNavigation('new-arrivals')}
              >
                New Arrivals
              </ScrollLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <ScrollLink
                to="nayab-exclusive"
                smooth={true}
                duration={500}
                offset={-50}
                onClick={() => handleNavigation('nayab-exclusive')}
              >
                Nayab Exclusives
              </ScrollLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">

              <ScrollLink
                to="special-offers"
                smooth={true}
                duration={500}
                offset={-50}
                onClick={() => handleNavigation('special-offers')}
              >
                Special Offers
              </ScrollLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to='/products'>Explore Shop</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Contact Info</h3>
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to='/about'>About us</Link>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to='/contact'>Contact us</Link>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to='/contact'>Store Location</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <h3 className="text-xl font-bodyFont font-semibold mb-6">Subscribe our Store</h3>
          <div className="w-full">
            <p className="text-center mb-4">
              Lorem Ipsum is simply dummy text of the printing.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="abc123@example.com"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="w-[30%] h-10 text base tracking-wide
                   border-2 border-gray-900 text-gray-900 xs:text-sm sm:text-sm md:text-sm font-semibold rounded-sm bg-transparent hover:bg-[#7b246d] hover:border-[#7b246d] hover:text-white transition-colors duration-300"
                >
                  Subscribe!
                </button>
              </div>
            )}

            <img className={`w-[80%] lg:w-[60%] mx-auto ${subscription ? "mt-2" : "mt-6"}`} src={paymentCard} alt="Payment Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
