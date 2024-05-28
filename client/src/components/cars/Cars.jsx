import React, { FC, useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../features/products/productsSlice";
import Header from '../header/Header';
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Sidebar from "../Sidebar/Sidebar";
import Products from "../Products/Products";
import { Context } from '../../index';
import Footer from '../Footer/Footer';

const Cars = () => {
    const { store } = useContext(Context);
    const [checkedAuth, setCheckedAuth] = useState(false);
    const {
        products: { list, filtered },
        categories,
      } = useSelector((state) => state);
    
    useEffect(() => {
        
    }, [checkedAuth, store]);

    
    const dispatch = useDispatch();
  
  useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice(500));
  }, [dispatch, list.length]);

  
    return (
       <>
       <Header></Header>
       <div className='cars-page-container'>
        <div className='sideandposter'>
       <Sidebar />
      <Poster />
      </div>
      <Products products={list} amount={5} title="Trending" />
      <Banner />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Products products={filtered} amount={5} title="Less than 500$" />
     <Footer></Footer></div>
    </>
    );
};

export default Cars;
