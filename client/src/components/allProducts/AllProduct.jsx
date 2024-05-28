import React from "react";

import Category from "../Categories/Category";
import Poster from "../Poster/Poster";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";
import ProductForm from "./ProductForm";
const SingleCategory = () => {
  return (
    <>
    <Header></Header>
    <div className='cars-page-container'>
    <div className='sideandposter'>
    <Sidebar></Sidebar>
      <Poster />
      </div>
      <ProductForm></ProductForm>
      </div>
    </>
  );
};

export default SingleCategory;
