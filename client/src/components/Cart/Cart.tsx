import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Context } from '../..';
import styles from "../../styles/Cart.module.css";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { IRent } from '../../models/IRent';
import RentService from '../../services/RentService';
import LoginForm from '../auth/LoginForm';
const Cart = () => {
  const { store } = useContext(Context);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPas, setIsModalOpenPas] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [rents, setRents] = useState<IRent[]>([]);
  const [rentToDelete, setRentToDelete] = useState<IRent | null>(null);

  useEffect(() => {
    if (!store.isAuth && localStorage.getItem('token')) {
      store.checkAuth();
    }
    getRents(); 
  }, []);
  if (store.isLoading) {
    return <div>Загрузка...</div>
}

if (!store.isAuth) {
    return <LoginForm />
}
  const totalPrice = rents.reduce((acc, rent) => acc + rent.price, 0);

  async function getRents() {
    try {
      const response = await RentService.fetchRents(store.user.id);
      setRents(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }


  
  const handleOpenDeleteModal = (rent: IRent) => {
    setRentToDelete(rent);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRentToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (rentToDelete) {
      try {
       const response= await RentService.deleteRent(rentToDelete._id);
        console.log(response)
        setRents(rents.filter(rent => rent._id !== rentToDelete._id));
        handleCloseDeleteModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="cars-page-container">
        <div className="sideandposter">
          <Sidebar />
          <section className={styles.cart}>
            <h2 className={styles.title}>My rentals</h2>

            {!rents.length ? (
              <div className={styles.empty}>Here is empty</div>
            ) : (
              <>
                <div className={styles.list}>
                  {rents.map((item) => {
                    const { _id, product_id, title, image, period, price, isConfirm, endDate, isEnd } = item;

                    return (
                      <div className={styles.item} key={product_id}>
                        <div className={styles.image}>
                          <img src={image} alt={title} />
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>{title}</h3>
                        </div>

                        <div className={`${styles.status} ${isConfirm ? styles.approved : styles.notApproved}`}>
                          {isConfirm ? 'Approved' : 'Not Approved'}
                        </div>

                        <div className={styles.dates}>
                          {`From: ${new Date().toLocaleDateString()} To: ${new Date(endDate).toLocaleDateString()}`}
                        </div>

                        <div className={styles.quantity}>
                          <span>{period} day(-s)</span>
                        </div>
                        <div className={`${styles.activeStatus} ${isEnd ? styles.notActive : styles.active}`}>
                          {isEnd ? 'Not Active' : 'Active'}
                        </div>

                        <div className={styles.total}>{price}$</div>

                        <div className={styles.close} onClick={() => handleOpenDeleteModal(item)}>
                          <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.actions}>
                  <div className={styles.total}>
                    TOTAL PRICE:{" "}
                    <span>
                      {totalPrice}$
                    </span>
                  </div>
                </div>
              </>
            )}
          </section> 
        </div>
      
      <Footer /></div>

      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to delete this rental from history?</h2>
            <div className={styles.modalActions}>
            <div className={styles.modalCansel}>
              <button onClick={handleCloseDeleteModal}>No</button></div>
              <button onClick={handleConfirmDelete}>Yes</button>
             
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
