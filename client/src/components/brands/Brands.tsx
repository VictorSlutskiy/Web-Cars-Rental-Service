import React, { FC, useContext, useState } from 'react';
import Modal from '../modal/modal';
import './brands.css';

import hm from './../../img/brands/posche.png';
import obey from './../../img/brands/audi.png';
import shopify from './../../img/brands/merc.png';
import lacoste from './../../img/brands/rols.png';
import levis from './../../img/brands/toyota.png';
import amazon from './../../img/brands/bmw.png';
import { Context } from '../../index';
import { NavLink } from "react-router-dom";
const Brands: FC = () => {
    const { store } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!store.isAuth) {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className="brands">
                <div className="container">
                    <ul className="brands__list">
                    <li><NavLink to={`/products`}><img src={hm} alt="Porsche" /></NavLink></li>
                     <li><NavLink to={`/products`}><img src={obey} alt="Audi" /></NavLink></li>
                    <li><NavLink to={`/products`}><img src={shopify} alt="Mercedes" /></NavLink></li>
                    <li><NavLink to={`/products`}><img src={lacoste} alt="Rolls-Royce" /></NavLink></li>
                    <li><NavLink to={`/products`}><img src={levis} alt="Toyota" /></NavLink></li>
                    <li><NavLink to={`/products`}><img src={amazon} alt="BMW" /></NavLink></li>

                    </ul>
                </div>
            </section>
            {isModalOpen && <Modal onClose={closeModal} />}
        </>
    );
}

export default Brands;
