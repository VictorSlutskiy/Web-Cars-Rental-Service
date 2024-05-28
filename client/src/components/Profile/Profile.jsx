import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/Profile.module.css";
import { Context } from '../..';
import ClientForm from '../auth/ClientForm'; 
import ChangePasswordForm from '../auth/changePassForm';
import userDeffault from '../../images/round-account-button-with-user-inside_icon-icons.com_72596.png';
import { ROUTES } from '../../utils/routes';

const Profile = () => {
  const { store } = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPas, setIsModalOpenPas] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [error, setError] = useState('');

  const defaultValues = {
    email: "",
    password: "",
    name: "",
    surname: "",
    patronymic:"",
    driver_license:"",
    passport_number: "",
    isActivated: false,
  };

  const [initialValues, setInitialValues] = useState(defaultValues);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      await store.checkAuth();
      if (store.isAuth) {
        loadUserData();
      }
    };

    if (!store.isAuth && localStorage.getItem('token')) {
      checkAuthAndLoadData();
    } else if (store.isAuth) {
      loadUserData();
    }
  }, [store.isAuth]);

  const loadUserData = () => {
    if (!store.user || !store.client) return;

    const userData = {
      email: store.user.email || "",
      isActivated: store.user.isActivated || false,
      name: store.client.name || "",
      surname: store.client.surname || "",
      patronymic: store.client.patronymic || "",
      passport_number: store.client.passport_number || "",
      driver_license: store.client.driver_license || "",
      password: store.client.password || "",
    };

    setInitialValues(userData);
    setValues(userData);
  };

  function formatKey(key) {
    switch (key) {
      case "driver_license":
        return "Driver License";
      case "passport_number":
        return "Passport Number";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToValidate = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "password" && key !== "isActivated" && key !== "email") {
        formDataToValidate[key] = value;
      }
    });
  
    const isFormValid = Object.values(formDataToValidate).every(value => value.trim() !== '');
    if (!isFormValid) {
      return setError('Please fill in all fields.');
    } else {
      try {
        await store.updateUser(store.user.id, formDataToValidate);
        setError('');
        setInitialValues(values); // Update initialValues with the new values
        setValues(values); // Ensure values are set to the new values
        setIsEditing(false); // Exit editing mode
      } catch (err) {
        setError('An error occurred while updating the data.');
      }
    }
  };
  

  const handlePasswordChange = () => {
    setIsModalOpenPas(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setValues(initialValues); // Сбросить значения до начальных при отмене
    setIsEditing(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false); 
    store.logout();
    
   navigate(ROUTES.MAIN)
   window.location.reload();
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true); 
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false); 
  };

  const handleClient = () => {
    if (!store.client.name) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    loadUserData(); // Update user data immediately after closing the modal
  };

  const handleCloseModalPas = () => {
    setIsModalOpenPas(false);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false); 
    store.deleteUser(store.user.id);
    navigate(ROUTES.MAIN)
    window.location.reload();
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true); 
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
  };

  return (
    <section className={styles.profile}>
      {!store.user ? (
        <span>You need to log in</span>
      ) : (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={userDeffault} alt="User Default" />
          </div>
          
          <div className={styles.userData}>
            <h1 style={{marginLeft:'2vw'}}>My page</h1>
            {isEditing ? (
              <>
               {error && <div className={`error-message`} style={{marginLeft:'1vw'}}>{error}</div>}
                {Object.entries(values).map(([key, value]) => (
                  key !== "password" && key !== "isActivated" && key !== "email" && (
                    <div key={key} className={styles.group}>
                      <input
                        className={styles.input}
                        type="text"
                        value={value}
                        maxLength={30} 
                        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                        required
                      />
                    </div>
                  )
                ))}
                <button onClick={handleSubmit} className={styles.button}>Submit</button>
                <button onClick={handleCancel} className={styles.link}>Cancel</button>
              </>
            ) : (
              <>
                {Object.entries(values).map(([key, value]) => {
                  if (value !== "" && value !== false && key !== "password" && key !== "isActivated") {
                    return (
                      <div key={key} className={styles.group}>
                        <p>{formatKey(key)}: {value}</p>
                      </div>
                    );
                  }
                  return null;
                })}
                <div className={styles.group}>
                  <p>{values.isActivated ? "Email is activated" : "Email is not activated"}</p>
                </div>
              </>
            )}
            
            <div className={styles.buttonGroup}>
              <button onClick={handleOpenLogoutModal} className={styles.button}>Log out</button>
              {!store.client.name && (
                <button onClick={handleClient} className={styles.button}>Add client information</button>
              )}
            </div>
          </div>
          
          <div className={styles.actions}>
            {store.client.name && (
              <button onClick={handleEdit} className={styles.link}>Edit</button>
            )}
            <button onClick={handlePasswordChange} className={styles.link}>Change Password</button>
            <button onClick={handleOpenDeleteModal} className={styles.link}>Delete Account</button>
          </div>
        </div>
      )}
      
      {isModalOpen && (
        <ClientForm onClose={handleCloseModal} />
      )}
      {isModalOpenPas && (
        <ChangePasswordForm onClose={handleCloseModalPas} />
      )}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete your account?</p>
            <div className={styles.modalActions}>
              <div className={styles.modalCansel}>
                <button onClick={handleCloseDeleteModal}>Cancel</button>
              </div>
              <button onClick={handleDeleteAccount}>Confirm</button>
            </div>
          </div>
        </div>
      )}
      {isLogoutModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to log out of your account?</p>
            <div className={styles.modalActions}>
              <div className={styles.modalCansel}>
                <button onClick={handleCloseLogoutModal}>Cancel</button>
              </div>
              <button onClick={handleLogout}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default observer(Profile);
