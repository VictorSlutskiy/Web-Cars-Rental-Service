import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from '../auth/LoginForm';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import Header from '../header/Header';
import AdminHeader from '../admin/AdminHeader';
import EmpHeader from '../emp/EmpHeader';
import './UserPanel.css'; // Подключаем стили для компонента
import DefaultUser from '../../img/icons/DefaultUser.png';
import Profile from '../Profile/Profile';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const UserPanel: FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (!store.isAuth && !localStorage.getItem('token')) {
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
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return <LoginForm />
    }

    let HeaderComponent;

    switch (store.user.role) {
        case 0:
            HeaderComponent = Header;
            break;
        case 1:
            HeaderComponent = AdminHeader;
            break;
        case 2:
            HeaderComponent = EmpHeader;
            break;
        default:
            HeaderComponent = Header;
    }

    return (
        <>
            <HeaderComponent />
            <div className='cars-page-container'>
                <div className='sideandposter'>
                    {store.user.role === 0 && <Sidebar />}
                    <Profile />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default observer(UserPanel);
