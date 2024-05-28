import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import RentService from '../../services/RentService';
import { IRent } from '../../models/IRent';
import EmpHeader from './EmpHeader';
import Footer from '../Footer/Footer';
import styles from '../../styles/Cart.module.css';
import userDeffault from '../../images/round-account-button-with-user-inside_icon-icons.com_72596.png';

const EmpRents = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [rents, setRents] = useState<IRent[]>([]);
  const [filteredRents, setFilteredRents] = useState<IRent[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rentToDelete, setRentToDelete] = useState<IRent | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [rentToConfirm, setRentToConfirm] = useState<IRent | null>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [rentToEnd, setRentToEnd] = useState<IRent | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
  const [isEnded, setIsEnded] = useState<boolean | null>(null);
 
  const defaultValues = {
    isConfirm: "",
    isEnd: "",
  };

  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    if (!store.isAuth && localStorage.getItem('token')) {
      
    }
    getRents();
  }, []);

  useEffect(() => {
    filterRents();
  }, [values, rents]);

  async function getRents() {
    try {
      const response = await RentService.fetchAllRents();
      setRents(response.data);
      setFilteredRents(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  
    // Если изменено значение фильтра "Activity status", обновляем состояние `isEnded`
    if (name === "isEnd") {
      setIsEnded(value === "" ? null : value === "true");
    }
  
    // Если изменено значение фильтра "Confirmation Status", обновляем состояние `isConfirmed`
    if (name === "isConfirm") {
      setIsConfirmed(value === "" ? null : value === "true");
    }
  };
  



  const handleOpenDeleteModal = (rent:any) => {
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
        const response = await RentService.deleteRent(rentToDelete._id);
        setRents(rents.filter(rent => rent._id !== rentToDelete._id));
        handleCloseDeleteModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleOpenConfirmModal = (rent: any) => {
    setRentToConfirm(rent);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setRentToConfirm(null);
  };

  const handleConfirmRent = async () => {
    if (rentToConfirm) {
      try {
        // Создание объекта Date с текущей датой и временем
        const currentDate = new Date();
        
        // Выполнение подтверждения аренды с передачей текущей даты и времени
        await RentService.confirmRent(rentToConfirm._id);
        
        // Обновление состояния аренды с установкой значения isConfirm в true и confirmationDate на текущую дату
        setRents(rents.map(rent => rent._id === rentToConfirm._id ? { ...rent, isConfirm: true, confirmationDate: currentDate } : rent));
        
        // Закрытие модального окна подтверждения
        handleCloseConfirmModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleOpenEndModal = (rent: any) => {
    setRentToEnd(rent);
    setIsEndModalOpen(true);
  };

  const handleCloseEndModal = () => {
    setIsEndModalOpen(false);
    setRentToEnd(null);
  };

  const handleEndRent = async () => {
    if (rentToEnd) {
      try {
        // Создание объекта Date с текущей датой и временем
        const currentDate = new Date();
        
        // Выполнение завершения аренды с передачей текущей даты и времени
        await RentService.endRent(rentToEnd._id);
        
        // Обновление состояния аренды с установкой значения isEnd в true и endDate на текущую дату
        setRents(rents.map(rent => rent._id === rentToEnd._id ? { ...rent, isEnd: true, endDate: currentDate } : rent));
        
        // Закрытие модального окна завершения
        handleCloseEndModal();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const filterRents = () => {
    let filtered = rents;
    if (values.isConfirm !== "") {
      filtered = filtered.filter(rent => rent.isConfirm.toString() === values.isConfirm);
    }
    if (isConfirmed !== null) {
      filtered = filtered.filter(rent => rent.isConfirm === isConfirmed);
    }
    if (isEnded !== null) {
      filtered = filtered.filter(rent => rent.isEnd === isEnded);
    }
    setFilteredRents(filtered);
  };
  

  return (
    <div className="App">
      <EmpHeader />
      <div className={styles.maincontainer}>
      <form className={styles.filters}>
  <div className={styles.filter}>
    <select name="isConfirm" value={values.isConfirm} onChange={handleChange}>
      <option value="">Confirmation Status</option>
      <option value="true">Approved</option>
      <option value="false">Not Approved</option>
    </select>
  </div>
  
  <div className={styles.filter}>
  <select name="isEnd" value={values.isEnd} onChange={handleChange}>
      <option value="">Activity status</option>
      <option value="true">Ended</option>
      <option value="false">Active</option>
    </select>
  </div>

</form>



        <div className={styles.rentsContainer}>
          {filteredRents.map(rent => (
            <div key={rent._id} className={styles.rentPanel}>
              <div className={styles.rentImageContainer}>
                <img className={styles.rentImage} src={rent.image || userDeffault} alt="User" />
              </div>
              <div className={styles.rentDetailsContainer}>
                <div>ID: {rent._id}</div>
                <div>Customer: {rent.user_id}</div>
                <div>Title: {rent.title}</div>
                <div>Price: {rent.price}$</div>
                <div>Status: {rent.isConfirm ? "Approved" : "Not Approved"}</div>
                {rent.isConfirm && (
                  <div>Confirm Date: {new Date(rent.confirmationDate).toLocaleDateString()}</div>
                )}

                <div>Active: {rent.isEnd ? "Ended" : "Active"}</div>
                {rent.isEnd && (
                  <div>End Date: {new Date(rent.endDate).toLocaleDateString()}</div>
                )}
              </div>
            
              <div className={styles.actionsRent}>
                <div className={styles.close} onClick={() => handleOpenDeleteModal(rent)}>
                  <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </div>
                {!rent.isConfirm && (
                  <button onClick={() => handleOpenConfirmModal(rent)}>Confirm</button>
                )}
                {!rent.isEnd && rent.isConfirm && (
                  <button onClick={() => handleOpenEndModal(rent)}>End</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isDeleteModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>Are you sure you want to delete this rent?</div>
              <div className={styles.modalActions}>
               
                <div className={styles.modalCansel}>
                  <button onClick={handleCloseDeleteModal}>No</button>
                </div>
                <button onClick={handleConfirmDelete}>Yes</button>
              </div>
            </div>
          </div>
        )}

        {isConfirmModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>Are you sure you want to confirm this rent?</div>
              <div className={styles.modalActions}>
              <div className={styles.modalCansel}>
                  <button onClick={handleCloseConfirmModal}>No</button>
                </div>
                <button onClick={handleConfirmRent}>Yes</button>
              
              </div>
            </div>
          </div>
        )}

        {isEndModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>Are you sure you want to end this rent?</div>
              <div className={styles.modalActions}>
              <div className={styles.modalCansel}>
                  <button onClick={handleCloseEndModal}>No</button>
                </div>
                <button onClick={handleEndRent}>Yes</button>
               
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
      
    </div>
  );
};

export default EmpRents;
