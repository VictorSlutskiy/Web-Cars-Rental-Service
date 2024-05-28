import React from "react";
import styles from "../../styles/Home.module.css";
import bannerVideo from "../../videos/bannerVideo.mp4";

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.bannercontainer}>
      <video autoPlay loop muted className={styles.video}>
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}>
        <p className={styles.discount}>
        <p>Special offers </p><p>for our special <span>customers</span></p>
          
        </p>
      </div>
    </div>
  </section>
);

export default Banner;
