import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import EmpHeader from './EmpHeader';
import Footer from '../Footer/Footer';
import styles from './EmpPanel.module.css';
import formStyles from './EmpPanel.module.css';
import userDeffault from '../../images/round-account-button-with-user-inside_icon-icons.com_72596.png';
import ProductForm from '../allProducts/ProductForm';
import { Category } from '../../models/Category';
import ProductService from '../../services/ProductService';
import EmpProductForm from './EmpProductForm';
import { Link } from 'react-router-dom';
import stylesCat from "../../styles/Categories.module.css";

interface FormData {
  title: string;
  price: number | null;
  description: string;
  images: string[];
  categoryId: string;
}

const Emp = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: null,
    description: '',
    images: [],
    categoryId: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [imageInput, setImageInput] = useState('');

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth || store.user.role !== 2) {
    if(store.user.role === 1){
      navigate('/admin')
    }
    else{
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCarClick = () => {
    setShowModal(true);
  };

  const handleAddCategoryClick = () => {
    setShowCategoryModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      price: null,
      description: '',
      images: [],
      categoryId: ''
    });
    setImageInput('');
    setError('');
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setNewCategory('');
    setNewCategoryImage('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryImage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageInput(e.target.value);
  };

  const handleAddImage = () => {
    if (formData.images.length < 4 && imageInput.trim() !== '') {
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, imageInput]
      }));
      setImageInput('');
    }
  };

  const handleDeleteImage = (index: number) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description || !formData.categoryId) {
      setError('All fields are required');
      return;
    }
try{
    const response = await ProductService.addProduct(formData);
  }
catch (e:any){
    if (e.response.status === 400){
      setError('Car with that name already exists')
      return
    }
  }
    
    closeModal();
    window.location.reload();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !newCategoryImage) {
      setError('All fields are required');
      return;
    }
    try {
      console.log('1')
      const response = await fetch('http://localhost:5000/api/addCat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCategory, image: newCategoryImage })
      });
      if (response.status === 400){
        setError('Сategory with that name already exists')
        return
      }
      
      const data = await response.json();
      console.log(data)
      setError
      setCategories([...categories, data.category]);

      closeCategoryModal();
       
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className={styles.App}>
      <EmpHeader />
      <div className={styles.maincontainer}>
        <button className={formStyles['modal-submit-btn']} onClick={handleAddCarClick}>Add Car</button>
        <button className={formStyles['modal-submit-btn']} onClick={handleAddCategoryClick}>Add Category</button>
        {showModal && (
          <div className={formStyles['modal-overlay']}>
            <div className={formStyles['modal-content']}>
              <span className={formStyles['modal-close']} onClick={closeModal}>&times;</span>
              <h2 className={formStyles['modal-title']}>Add Car</h2>
              <form className="modal-input" onSubmit={handleSubmit}>
              {error && <div className={`error-message`} style={{textAlign:'center'}}>{error}</div>}
                <div className={formStyles['modal-text']}>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxLength={40} 
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                </div>
                <div className={formStyles['modal-text']}>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min={1}
                    value={formData.price || ''}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                  />
                </div>
                <div className={formStyles['modal-text']}>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    maxLength={500} 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                </div>
                <div className={formStyles['modal-text']}>
                  <input
                    type="text"
                    id="imageInput"
                    value={imageInput}
                    onChange={handleImageChange}
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className={formStyles['add-image-btn']}
                  >
                    Add Image
                  </button>
                </div>
                <div className={formStyles['modal-text']}>
                  {formData.images.map((image, index) => (
                    <div key={index} className={formStyles['image-container']}>
                      <img src={image} alt={`Image ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className={formStyles['delete-image-btn']}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className={formStyles['filter']}>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={formStyles['modal-submit-btn']}>
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
        {showCategoryModal && (
          <div className={formStyles['modal-overlay']}>
            <div className={formStyles['modal-content']}>
              <span className={formStyles['modal-close']} onClick={closeCategoryModal}>
                &times;
              </span>
              <h2 className={formStyles['modal-title']}>Add Category</h2>
              <form className="modal-input" onSubmit={handleCategorySubmit}>
                {error && <div className={`error-message`} style={{textAlign:'center'}}>{error}</div>}
                <div className={formStyles['modal-text']}>
                  <input
                    type="text"
                    id="newCategory"
                    maxLength={50} 
                    name="newCategory"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    placeholder="Category Name"
                    required
                  />
                </div>
                <div className={formStyles['modal-text']}>
                  <input
                    type="text"
                    id="newCategoryImage"
                    name="newCategoryImage"
                    value={newCategoryImage}
                    onChange={handleCategoryImageChange}
                    placeholder="Category Image URL"
                    required
                  />
                </div>
                <button type="submit"  className={formStyles['modal-submit-btn']}>
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
        <section className={stylesCat.section}>
          <h2>All Categories</h2>
          <div className={stylesCat.list}>
            {categories.map((category) => (
              <Link to={`/empCategories/${category._id}`} key={category._id} className={stylesCat.item}>
                <img src={category.image} alt={category.name} className={stylesCat.image} />
                <h3 className={stylesCat.title}>{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>
        <EmpProductForm />
      </div>
    </div>
  );
};

export default Emp;
