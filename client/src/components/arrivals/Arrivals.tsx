import React, { FC } from 'react';
import Card from '../card/Card';
import './arrivals.css';

import cat01Img from './../../img/categories/cat-01.jpg';
import cat02Img from './../../img/categories/cat-02.jpg';
import cat03Img from './../../img/categories/cat-03.jpg';

const Arrivals: FC = () => {
    return (
        <section className="arrivals">
            <div className="container">
                <div className="arrivals__header">
                    <h2 className="title-2">UNIQUE FEATURES</h2>
                </div>
                <div className="arrivals__cards">
                    <Card title="Premium & Luxury" img={cat01Img}  link="/categories/663fc5ec56e5d776f7206e06"/>
                    <Card title="Sport & Performance" img={cat02Img} link="/categories/663fcfeb56e5d776f7206e1b"/>
                    <Card title="Classic & Vintage" img={cat03Img} link="/categories/663fd03756e5d776f7206e1e"/>
                </div>
            </div>
        </section>
    );
};

export default Arrivals;
