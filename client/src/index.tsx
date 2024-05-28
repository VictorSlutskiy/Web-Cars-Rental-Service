import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/store';
import React, { createContext } from 'react';
import { Provider } from "react-redux";
import { apiSlice } from "./features/api/apiSlice";

import categoriesSlice from "./features/categories/categoriesSlice";
import productsSlice from "./features/products/productsSlice";
import userSlice from "./features/user/userSlice";
import './styles/reset.css';
import './styles/common.css'
import "./styles/index.css";
const storeInstance = new Store();

export const Context = createContext({
  store: storeInstance,
});

const rootReducer = {
  categories: categoriesSlice,
  products: productsSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Context.Provider value={{ store: storeInstance }}>
      <App />
    </Context.Provider>
  </Provider>
);
