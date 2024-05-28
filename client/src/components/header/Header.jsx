
import React, { FC, useContext, useState } from 'react';
import logoImg from './../../img/icons/logo.svg';
import UserImg from './../../img/icons/icon-user.svg';
import { Context } from '../../index';
import Modal from '../modal/modal';
import './header.css';
import searchIcon from '../../images/search-svgrepo-com.svg'
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '../../utils/routes';

const Header = () => {
    const { store } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLinkClick = (e) => {
        if (!store.isAuth) {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [searchValue, setSearchValue] = useState("");
    const { currentUser, cart } = useSelector(({ user }) => user);
  
    
  
    const { data, isLoading } = useGetProductsQuery({ title: searchValue });
  
   
  
    const handleClick = () => {
      if (!currentUser) dispatch(toggleForm(true));
      else navigate(ROUTES.PROFILE);
    };
  
    const handleSearch = ({ target: { value } }) => {
      setSearchValue(value);
    };
    return (
        <header className="header">
            <div className="container">
                <div className="header__row">
               
                    <nav className="header__nav">
                        <ul><li> <a href="/">
                    <div className="header__logo">
                        <img src={logoImg} alt="Logo" />
                        <span className="header__title">CARS RENTAL SERVICE</span>
                    </div></a></li>
                        <form className="myform" >
  <div className="icon">
    <img src={searchIcon}>
    </img>
  </div>
  <div className="search">
    <input
      type="search"
      name="search"
      placeholder="Search for anything..."
      autoComplete="off"
      onChange={handleSearch}
      value={searchValue}
    />
  </div>

  {searchValue && (
    <div className="box">
      {isLoading
        ? "Loading"
        : !data.length
        ? "No results"
        : data.map(({ title, images, _id }) => {
            return (
              <Link
                key={_id}
                onClick={() => setSearchValue("")}
                className="item"
                to={`/products/${_id}`}
              >
                <div
                  className="image"
                  style={{ backgroundImage: `url(${images[0]})` }}
                />
                <div className="title">{title}</div>
              </Link>
            );
          })}
    </div>
  )}
</form>

          
                            <li><Link to={ROUTES.HOME} >CARS</Link></li>
                            <li><Link to={ROUTES.CART} onClick={handleLinkClick}>MY RENTALS</Link></li>
                            {store.isAuth ? (
                                <>
                                    <li><Link to={ROUTES.PROFILE} className="header__nav-btn">{store.user.email}<img src={UserImg} alt="Logo" /> </Link></li> 
                                </>
                            ) : (
                                <li><Link to={ROUTES.AUTH} className="header__nav-btn">SIGN UP</Link></li>
                            )}
                        </ul>
                        </nav>
                </div>
            </div>
            {isModalOpen && <Modal onClose={closeModal} />}
        </header>
    );
};

export default Header;
