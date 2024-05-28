import React, { FC, useContext, useState } from 'react';
import Modal from '../modal/modal';
import './promo.css';
import promoImg from './../../img/images/header-img.png';
import { Context } from '../../index';

const Promo: FC = () => {
    const { store } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className="promo">
                <div className="container">
                    <div className="promo__content">
                        <div className="promo__text">
                            <div className="promo__title">
                                <span className="highlight">
                                    <span>LET’S</span>
                                </span>
                                ENJOY
                                <span className="highlight highlight--yellow">
                                    <span>LUXURY</span>
                                </span>
                                CARS.
                            </div>
                            <div className="promo__desc">
                                Experience unmatched luxury with our exclusive fleet!
                            </div>
                            <div className="promo__btn-wrapper">
                                <a href="/cars"  className="promo__btn">Rent Now</a>
                            </div>
                        </div>
                        <div className="promo__img">
                            <img src={promoImg} alt="Promo" />
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && <Modal onClose={closeModal} />}
        </>
    );
}

export default Promo;
