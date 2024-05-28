import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";

import { ROUTES } from "../../utils/routes";
import styles from "./EmpPanel.module.css"
import EmpProduct from "./EmpProduct";
import EmpProducts from "./EmpProducts";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import EmpHeader from "./EmpHeader";

const EmpSingleProduct = () => {
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
    if (!data || !data.category || !_id) return;
  
    dispatch(getRelatedProducts({ categoryId: data.category, productId: _id }));
  }, [data, dispatch, _id]);
  

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
     <EmpHeader />
      <div className={styles.maincontainer}>
        
          <EmpProduct {...data} />
        
        <Footer></Footer>
      </div>
    </>
  );
};

export default EmpSingleProduct;
