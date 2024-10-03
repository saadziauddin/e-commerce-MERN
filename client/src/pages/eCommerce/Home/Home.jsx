import React from "react";
import Banner from "../../../components/Banner/Banner";
import BestSellers from "../../../components/home/Products/BestSellers/BestSellers";
import NewArrivals from "../../../components/home/Products/NewArrivals/NewArrivals";
import Sale from "../../../components/home/Sale/Sale";
import SpecialOffers from "../../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <Banner />
        <Sale />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
