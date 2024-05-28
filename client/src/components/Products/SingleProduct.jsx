import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";

import { ROUTES } from "../../utils/routes";

import Product from "./Product";
import Products from "./Products";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ _id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    
  }, [isLoading, isFetching, isSuccess]);

 
  useEffect(() => {
console.log(data)
    if (!data || !data.category || !_id) return;
  
    dispatch(getRelatedProducts(data.category));
  }, [data, dispatch, _id]);
  

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
    <Header></Header>
    <div className='cars-page-container'>
    <div className='sideandposter'>
    <Sidebar></Sidebar>
      <Product {...data} /></div>
      <Products products={related} amount={5} title="Related cars" />
      <Footer></Footer>
      </div>
    </>
  );
};

export default SingleProduct;
