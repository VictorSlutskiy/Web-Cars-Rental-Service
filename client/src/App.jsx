import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Spinner } from "react-bootstrap";

import { getCategories } from "./features/categories/categoriesSlice";
import { getProducts } from "./features/products/productsSlice";
import { useDispatch } from "react-redux";
import AppRoutes from './components/Routes/Routes';

const App = () => {
  const dispatch = useDispatch();
  const { store } = useContext(Context);
  // const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <Spinner animation={"grow"} />
  }

  return (
        <AppRoutes></AppRoutes>
  );
};

export default observer(App);
