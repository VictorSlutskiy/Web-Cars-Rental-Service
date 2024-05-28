import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../utils/routes";
import styles from "../../styles/Product.module.css";
import ConfirmRent from "./ConfirmRent";
import { Context } from '../..';
import ClientForm from '../auth/ClientForm'; 

const SIZES = ["1d", "7d", "30d"];

const Product = (item) => {
  const {_id, title, price, images, description } = item;
  const { store } = useContext(Context); // Получаем контекст для user.id

  const dispatch = useDispatch();
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  const handleCloseClientForm = () => {
    setIsClientFormOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClient = () => {
    if (!store.client.name) {
      setIsClientFormOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$/d </div>
        
        <div className={styles.sizes}>
          <span>Periods:</span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${currentSize === size ? styles.active : ""}`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            onClick={openModal}
            className={styles.add}
            disabled={!currentSize || !store.client.name || !store.isAuth}
          >
            Rent
          </button>
        </div>
        <div className={styles.warning_container}>
          {store.isAuth ? (
            !store.client.name && (
              <>
                <span className={styles.warning}>Please complete your profile to rent this car</span>
                <button onClick={handleClient} className={styles.clientForm}>
                  Fill out the form
                </button>
              </>
            )
          ) : (
            <>
              <span className={styles.warning}>Please log in to rent this car</span>
              <Link to={ROUTES.AUTH} className={styles.clientForm}>
                Log in
              </Link>
            </>
          )}
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmRent
          onClose={closeModal}
          price={price}
          period={currentSize}
          userId={store.user.id}
          productId={_id}
        />
      )}
      {isClientFormOpen && <ClientForm onClose={handleCloseClientForm} />}
    </section>
  );
};

export default Product;
