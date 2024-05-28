import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Footer.module.css";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../img/icons/logo.svg";

const Footer = () => (
  <section className={styles.footer}>
    <div className={styles.logo}>
     
        <div className={styles.logofooter}>
        <img src={LOGO} alt="CRS" />
        <h2> Cars Rental Service</h2>
        </div>
      
    </div>

    <div className={styles.rights}>
      Developed by{" "}
      <a href="https://github.com/VictorSlutskiy" target="_blank" rel="noreferrer">
        Slutskiy Victor
      </a>
    </div>

    <div className={styles.socials}>
      <a href="https://www.instagram.com/vslutskiy/" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
        </svg>
      </a>

      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
        </svg>
      </a>

      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
        </svg>
      </a>
    </div>
  </section>
);

export default Footer;
