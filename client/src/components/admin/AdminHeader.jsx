import React, { useContext, useEffect, useState } from 'react';
import logoImg from './../../img/icons/logo.svg';
import UserImg from './../../img/icons/icon-user.svg';
import { Context } from '../../index';
import Modal from '../modal/modal';
import '../header/header.css';
import searchIcon from '../../images/search-svgrepo-com.svg';
import { useGetUsersQuery } from "../../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '../../utils/routes';
import { toggleForm } from "../../features/user/userSlice";

const AdminHeader = () => {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { currentUser } = useSelector(({ user }) => user);
  const { data: users = [], isLoading } = useGetUsersQuery(searchValue);

  useEffect(() => {
    if (!store.isAuth && !localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  const handleLinkClick = (e) => {
    if (!store.isAuth) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  return (
    <header className="header">
    <div className="container">
        <div className="header__row">
       
            <nav className="header__nav">
                <ul><li> <a href="/admin">
            <div className="header__logo">
                <img src={logoImg} alt="Logo" />
                <span className="header__title">CARS RENTAL SERVICE ADMIN PANEL</span>
            </div></a></li>
                <form className="myform" >
                <div className="icon">
                  <img src={searchIcon} alt="Search Icon" />
                </div>
                <div className="search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search for users..."
                    autoComplete="off"
                    onChange={handleSearch}
                    value={searchValue}
                  />
                </div>
                {searchValue && (
                  <div className="box">
                    {isLoading ? (
                      "Loading"
                    ) : !users.length ? (
                      "No results"
                    ) : (
                      users.map(({ email, _id }) => (
                        <Link
                          key={_id}
                          onClick={() => setSearchValue('')}
                          className="item"
                          to={`/users/${_id}`}
                        >
                          <div className="title">{email}</div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </form>
              {store.isAuth ? (
                <li>
                  <Link to={ROUTES.PROFILE} className="header__nav-btn">
                    {store.user.email}
                    <img src={UserImg} alt="User" />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to={ROUTES.AUTH} className="header__nav-btn">
                    SIGN UP
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </header>
  );
};

export default AdminHeader;
