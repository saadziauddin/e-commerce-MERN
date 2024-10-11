// import React from "react";
// import Banner from "./Banner/Banner";
// import BestSellers from "../Products/BestSellers/BestSellers";
// import NewArrivals from "../Products/NewArrivals/NewArrivals";
// import SpecialOffers from "../Products/SpecialOffers/SpecialOffers";
// import YearProduct from "../Products/YearProduct/YearProduct";

// const Home = () => {
//   return (
//     <div className="w-full mx-auto md:max-w-container lg:max-w-container xl:max-w-container">
//         <Banner />
//         <NewArrivals />
//         <BestSellers />
//         <YearProduct />
//         <SpecialOffers />
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import Banner from "./Banner/Banner";
// import BestSellers from "../Products/BestSellers/BestSellers";
// import NewArrivals from "../Products/NewArrivals/NewArrivals";
// import SpecialOffers from "../Products/SpecialOffers/SpecialOffers";
// import YearProduct from "../Products/YearProduct/YearProduct";

// const Home = () => {
//   return (
//     <div className="w-full mx-auto md:max-w-container lg:max-w-container xl:max-w-container">
//       <Banner />
//         {/* <div id="new-arrivals"> */}
//           <NewArrivals id="new-arrivals"/>
//         {/* </div> */}
//         <div id="best-sellers">
//           <BestSellers />
//         </div>
//         <div id="year-product">
//           <YearProduct />
//         </div>
//         <div id="special-offers">
//           <SpecialOffers />
//         </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Banner from "./Banner/Banner";
import BestSellers from "../Products/BestSellers/BestSellers";
import NewArrivals from "../Products/NewArrivals/NewArrivals";
import SpecialOffers from "../Products/SpecialOffers/SpecialOffers";
import NayabExclusive from "../Products/NayabExclusive/NayabExclusive";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <Banner />
      </div>

      <div id="new-arrivals">
        <NewArrivals />
      </div>

      <div>
        <BestSellers />
      </div>

      <div id="nayab-exclusive">
        <NayabExclusive />
      </div>

      <div id="special-offers">
        <SpecialOffers />
      </div>
    </>
  );
};

export default Home;
