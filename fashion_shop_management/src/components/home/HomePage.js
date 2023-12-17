import React from "react";
import HomeHeader from "./HomeHeader";
import HomeCollection from "./HomeCollection";
import HomeShowProducts from "./HomeShowProducts";
import HomeFooter from "./HomeFooter";
import "./home.css";
import HomeCarousel from "./HomeCarousel";

const HomePage = () => {
  return (
    <>
      <HomeHeader></HomeHeader>
      <HomeCarousel></HomeCarousel>
      <HomeCollection></HomeCollection>
      <HomeShowProducts></HomeShowProducts>
      <HomeFooter></HomeFooter>
    </>
  );
};

export default HomePage;
