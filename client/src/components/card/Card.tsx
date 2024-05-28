import React, { FC, useContext, useState } from 'react';
import Modal from '../modal/modal';
import styles from './Card.module.css';
import arrowImg from './../../img/icons/arrow.svg';
import { Context } from '../../index';

const Card: FC<{ title: string; img: string , link: string}> = ({ title, img, link }) => {
    const { store } = useContext(Context);
    

    return (
        <>
            <div className={styles.card}>
                <a href={link} className={styles.card__link} ></a>
                <img className={styles.card__img} src={img} alt="Category ..." />

                <div className={styles.card__body}>
                    <div className={styles.card__text}>
                        <div className={styles.card__title}>{title}</div>
                        <div className={styles.card__muted}>Start Now!</div>
                    </div>
                    <div className={styles.card__icon}>
                        <img src={arrowImg} alt="Open" />
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Card;
