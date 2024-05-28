import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../utils/routes";
import styles from "./EmpProduct.module.css";
import { useNavigate } from 'react-router-dom';
import { Context } from "../..";
import ClientForm from "../auth/ClientForm";
import ProductService from "../../services/ProductService";

const EmpProduct = (item) => {
  const { _id, title, price, images, description } = item;
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ title, price, description });
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    price: "",
    description: "",
   
  });
  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

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

    if (!isEditing) {
      setFormValues({ title, price, description });
    }
  };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

  const handleSubmit = () => {
    const response = ProductService.updateProduct(_id, formValues);
    console.log(response)
   
    setIsEditing(false);
    window.location.reload();
    
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const response = ProductService.deleteProduct(_id);
    console.log(response)
    setShowDeleteModal(false); 
    navigate('/emp')
    window.location.reload();
  };

  const closeModal = () => {
    setShowDeleteModal(false); 
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
      <div className={styles.left}>
    {isEditing ? (
        <>
            <label htmlFor="title" className={styles.label}>Title:</label>
            <input
                type="text"
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleInputChange}
                className={styles.input}
            />
            <label htmlFor="price" className={styles.label}>Price:</label>
            <input
                type="number"
                name="price"
                id="price"
                value={formValues.price}
                onChange={handleInputChange}
                className={styles.input}
            />
            <label htmlFor="description" className={styles.label}>Description:</label>
            <textarea
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleInputChange}
                className={styles.input}
            />
            <div>{isEditing && (
                            <button onClick={handleSubmit} className={styles.button}>
                                Submit
                            </button>
                        )}</div>
           
        </>
    ) : (
        <>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.price}>{price}$</div>
            <p className={styles.description}>{description}</p>
        </>
    )}
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
                    <div className={styles.warning_container}></div>
                  
                </div>
                <div className={styles.bottom}>
                        <Link to={ROUTES.EMP}>Return to emp panel</Link>
                    </div>
            </div>
            {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this product?</p>
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
);
};

export default EmpProduct;
