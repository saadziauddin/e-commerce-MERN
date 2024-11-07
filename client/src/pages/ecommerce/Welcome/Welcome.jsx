import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6 py-16"
        >
          {/* <img src={emptyCart} alt="Welcome" className="w-80" /> */}
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to Our Store!
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            We’re excited to have you here. Discover our wide range of products and find what you’re looking for. Dive in and start exploring!
          </p>
          <Link to="/products">
            <button className="px-8 py-3 bg-[#7b246d] text-white rounded-lg hover:bg-black transition duration-300">
              Start Exploring
            </button>
          </Link>
        </motion.div>
    </div>
  );
}

export default Welcome;
