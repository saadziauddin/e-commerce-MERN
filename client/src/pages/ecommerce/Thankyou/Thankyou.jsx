// import React from 'react';
// import { motion } from "framer-motion";
// import { Link } from 'react-router-dom';
// import confettiGif from '../../../../public/Assets/GIF/confetti.gif';
// import { FaShoppingBag } from 'react-icons/fa';

// const ThankYou = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="flex flex-col items-center gap-8 text-center py-16 px-4"
//       >

//         <img src={confettiGif} alt="Celebration" className="w-32 h-32 mb-4" />
        
//         <h2 className="text-4xl font-semibold font-heading text-purple-800">Thank You for Your Purchase!</h2>
        
//         <p className="text-[17px] font-heading text-gray-700 max-w-lg">
//           We appreciate your trust in us. Your order has been received and is being processed. You’ll receive an email confirmation soon. Meanwhile, check out more items or get inspired!
//         </p>
        
//         <Link to="/products">
//           <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
//             <FaShoppingBag />
//             Continue Shopping
//           </button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// }

// export default ThankYou;

import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import confettiGif from '../../../../public/Assets/GIF/confetti.gif';
import congratulationsGif from '../../../../public/Assets/GIF/congratulations.gif';

const ThankYou = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${congratulationsGif})` }}
    >
      {/* <div className="absolute inset-0 bg-purple-100 bg-opacity-80"></div> Overlay for better readability */}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 p-6 sm:p-10 md:p-12 lg:p-16 text-center rounded-lg bg-white bg-opacity-90 shadow-lg w-full max-w-md mx-4"
      >
        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-purple-800">Thank You for Your Purchase!</h2>
        
        <p className="text-[15px] md:text-[17px] font-heading text-gray-700">
          We appreciate your trust in us. Your order has been received and is being processed. You’ll receive an email confirmation soon. Meanwhile, check out more items or get inspired!
        </p>
        
        <Link to="/products">
          <button className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
            <FaShoppingBag />
            Continue Shopping
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
