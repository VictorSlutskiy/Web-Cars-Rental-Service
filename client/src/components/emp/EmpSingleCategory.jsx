import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCatQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import styles from "./EmpProduct.module.css"; // Используем те же стили
import EmpHeader from "./EmpHeader";
import Footer from "../Footer/Footer";
import ClientForm from "../auth/ClientForm";
import CategoryService from "../../services/CategoryService";
import { Context } from "../..";

const EmpSingleCategory = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { store } = useContext(Context);
  
  const { data, isLoading, isFetching, isSuccess } = useGetCatQuery({ _id });
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", image: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.EMP);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  useEffect(() => {
    if (data) {
      setFormValues({ name: data.name, image: data.image });
    }
  }, [data]);

  const handleCloseClientForm = () => {
    setIsClientFormOpen(false);
  };

  const handleClient = () => {
    if (!store.client.name) {
      setIsClientFormOpen(true);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);

    if (!isEditing && data) {
      setFormValues({ name: data.name, image: data.image });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await CategoryService.updateCategory(_id, formValues);
    console.log(response);
    setIsEditing(false);
    window.location.reload();
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const response = await CategoryService.deleteCategory(_id);
    console.log(response);
    setShowDeleteModal(false);
    navigate(ROUTES.EMP);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return isLoading || isFetching ? (
    <section className="preloader">Loading...</section>
  ) : (
    data && (
      <>
        <EmpHeader />
        <div className={styles.maincontainer}>
          <section className={styles.product}>
            <div className={styles.images}>
              {isEditing ? (
                <input
                  type="text"
                  name="image"
                  value={formValues.image}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                <div
                  className={styles.current}
                  style={{ backgroundImage: `url(${data.image})` }}
                />
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.left}>
                {isEditing ? (
                  <>
                    <label htmlFor="name" className={styles.label}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </>
                ) : (
                  <h1 className={styles.title}>{data.name}</h1>
                  
                )}
                <div> {isEditing && (
                    <button onClick={handleSubmit} className={styles.button}>
                      Submit
                    </button>
                  )}</div>
                
              </div>
            </div>
            <div className={styles.actions}>
           
              <div className={styles.right}>
                <div className={styles.buttonGroup}>
                 
                  <button onClick={handleDelete} className={styles.link}>
                    Delete
                  </button>
                  <button onClick={handleEditToggle} className={styles.link}>
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>
              </div>
              <div className={styles.bottom}>
                <a href={ROUTES.EMP}>Return to emp panel</a>
              </div>
            </div>
            {showDeleteModal && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <p>Are you sure you want to delete this category?</p>
                  <div className={styles.modalActions}>
                    <div className={styles.modalCansel}>
                      <button onClick={closeModal}>Cancel</button>
                    </div>
                    <button onClick={confirmDelete}>Yes</button>
                  </div>
                </div>
              </div>
            )}
            {isClientFormOpen && <ClientForm onClose={handleCloseClientForm} />}
          </section>
          <Footer />
        </div>
      </>
    )
  );
};

export default EmpSingleCategory;
