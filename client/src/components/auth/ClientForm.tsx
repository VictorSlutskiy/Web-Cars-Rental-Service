import React, { FC, useContext, useState } from 'react';
    import '../modal/modal.css';
    import { Context } from '../..';

    interface ClientFormProps {
        onClose: () => void;
    }
   
    const ClientForm: FC<ClientFormProps> = ({ onClose }) => {
        const { store } = useContext(Context);
        const [formData, setFormData] = useState({
            name: '',
            surname: '',
            patronymic: '',
            passport_number: '',
            driver_license: ''
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            
        };

        const handleSubmit =  async (e: React.FormEvent) => {
            e.preventDefault();
           
            const isFormValid = Object.values(formData).every(value => value.trim() !== '');
           
            if (isFormValid) {
                console.log(formData)
                await store.updateUser(store.user.id, formData);
                onClose(); 
                
            } else {
                alert('Please fill in all required fields.');
            }
            
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <span className="modal-close" onClick={onClose}>✖</span>
                    <h2 className="modal-title">Fill in the form</h2>
                    <form className="modal-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Surname"
                            required
                        />
                        <input
                            type="text"
                            name="patronymic"
                            value={formData.patronymic}
                            onChange={handleChange}
                            placeholder="Patronymic"
                            required
                        />
                        <input
                            type="text"
                            name="passport_number"
                            value={formData.passport_number}
                            onChange={handleChange}
                            placeholder="Passport Number"
                            required
                        />
                        <input
                            type="text"
                            name="driver_license"
                            value={formData.driver_license}
                            onChange={handleChange}
                            placeholder="Driver License"
                            required
                        />
                        <button type="submit" className="modal-submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    export default ClientForm;
