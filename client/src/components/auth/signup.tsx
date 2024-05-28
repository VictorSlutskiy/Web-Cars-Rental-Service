import React, { FC, useContext, useEffect, useState } from 'react';

import LoginForm from './LoginForm';

import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import Header from '../header/Header';
import Promo from '../promo/Promo';
import Brands from '../brands/Brands';
import Card from '../card/Card';
import Arrivals from '../arrivals/Arrivals';
import Footer from '../Footer/Footer';
import ClientForm from './ClientForm';
import Main from '../main/main';
import Emp from '../emp/Emp';
import AdminPanel from '../admin/AdminPanel';
import { check } from 'express-validator';
const Signup: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

 
  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }
 
 
if(store.isAuth){

  switch (store.user.role) {
    case 0:
      return <Main />;
    case 1:
      return <AdminPanel />;
    case 2:
      return <Emp />;
    default:
      return <div>Unauthorized</div>;
  }
}
return   <div>def</div>;

};

export default observer(Signup);
