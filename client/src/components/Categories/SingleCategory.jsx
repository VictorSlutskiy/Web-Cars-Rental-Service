import React from "react";

import Category from "./Category";
import Poster from "../Poster/Poster";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const SingleCategory = () => {
  return (
    <>
    <Header></Header>
    <div className='cars-page-container'>
    <div className='sideandposter'>
    <Sidebar></Sidebar>
      <Poster />
      </div>
      <Category />
      <Footer></Footer>
      </div>
    </>
  );
};

export default SingleCategory;
