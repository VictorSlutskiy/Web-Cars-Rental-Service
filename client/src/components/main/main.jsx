import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Promo from "../promo/Promo";
import Brands from "../brands/Brands";
import Arrivals from "../arrivals/Arrivals";
import Footer from "../Footer/Footer";

const Main = () => {
 
  return (
    <div className="App">
      <Header />
      <Promo />
      <Brands />
      <Arrivals />
      <div style={{ margin: '2vh 8vw 2vh 5.5vw' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
