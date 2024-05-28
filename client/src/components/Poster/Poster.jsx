import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/Home.module.css";

import BG from "../../images/BMWM5F90.png";

const Poster = () => (
  <section className={styles.home}>
    <div className={styles.title}>BIG SALE 20%</div>
    <div className={styles.product}>
      <div className={styles.text}>
        <div className={styles.subtitle}>the bestseller of 2024</div>
        <h1 className={styles.head}>BMW M5 F90</h1>
        <Link to="/products/6641b0ca1c6ed3b0be1dea97" className={styles.buttondeffault }>Rent Now</Link>
      </div>
      <div className={styles.image}>
        <img src={BG} alt="" />
      </div>
    </div>
  </section>
);

export default Poster;
