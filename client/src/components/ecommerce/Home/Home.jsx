import React from "react";
import Banner from "./Banner/Banner";
import BestSellers from "../Products/BestSellers/BestSellers";
import NewArrivals from "../Products/NewArrivals/NewArrivals";
import SpecialOffers from "../Products/SpecialOffers/SpecialOffers";
import YearProduct from "../Products/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <Banner />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
