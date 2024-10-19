// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

// const About = () => {
//   const location = useLocation();
//   const [prevLocation, setPrevLocation] = useState("");
//   useEffect(() => {
//     setPrevLocation(location.state.data);
//   }, [location]);
//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="About" prevLocation={prevLocation} />
//       <div className="pb-10">
//         <h1 className="max-w-[600px] text-base text-lightText mb-2">
//           <span className="text-primeColor font-semibold text-lg">Orebi</span>{" "}
//           is one of the world's leading ecommerce brands and is internationally
//           recognized for celebrating the essence of classic Worldwide cool
//           looking style.
//         </h1>
//         <Link to="/shop">
//           <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default About;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    // Check if location.state exists and has a data property
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      // Fallback if there's no previous location data
      setPrevLocation("Home"); // or any default value you want
    }
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Orebi</span>{" "}
          is one of the world's leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic Worldwide cool
          looking style.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
