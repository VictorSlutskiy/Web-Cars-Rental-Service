import React from "react";
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Arrivals from '../arrivals/Arrivals';
import Brands from '../brands/Brands';
import Header from '../header/Header';
import Promo from '../promo/Promo';
import { ROUTES } from "../../utils/routes";
import Signup from '../auth/signup.tsx';
import User from '../user/UserPanel';
import Cars from '../cars/Cars';
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import AllProducts from "../allProducts/AllProduct";
import Main from "../main/main";
import AdminPanel from "../admin/AdminPanel";
import Emp from "../emp/Emp";
import UserManagement from "../admin/UserManagement";
import EmpRents from "../emp/EmpRents";
import EmpSingleProduct from "../emp/EmpSingleProduct";
import EmpSingleCategory from "../emp/EmpSingleCategory";

const AppRoutes = () => (
  <Router>
  <Routes>
    <Route path={ROUTES.EMP} element={<Emp />}/>
    <Route path={ROUTES.EMPRENTS} element={<EmpRents />}/>
    <Route path={ROUTES.EMPSINGLEPRODUCT} element={<EmpSingleProduct />}/>
    <Route path={ROUTES.EMPSINGLECATEGORY} element={<EmpSingleCategory />}/>
    <Route path={ROUTES.ADMIN} element={<AdminPanel />}/>
    <Route path={ROUTES.MAIN} element={<Main />} />
    <Route path={ROUTES.AUTH} element={<Signup />} />
    <Route path={ROUTES.PROFILE} element={<User />} />
    <Route path={ROUTES.HOME} element={<Cars />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} />
    <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
    <Route path={ROUTES.CART} element={<Cart />} />
    <Route path={ROUTES.PRODUCTS} element={<AllProducts />} />
    <Route path={ROUTES.USERMANAGEMENT} element={<UserManagement />} />
    <Route path="*" element={<Navigate to={ROUTES.MAIN}/>} exact/>
  </Routes>
  </Router>
);

export default AppRoutes;
