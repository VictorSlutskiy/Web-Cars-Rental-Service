import React, { FC, useContext, useState } from 'react';
import '../modal/modal.css';
import { Context } from '../..';

interface ChangePasswordFormProps {
    onClose: () => void;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onClose }) => {
    const { store } = useContext(Context);
    const [error, setError] = useState<string>('');
    const [errorClass, setErrorClass] = useState<string>('');
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const { oldPassword, newPassword, repeatNewPassword } = formData;
    
        if (oldPassword.trim() === '' || newPassword.trim() === '' || repeatNewPassword.trim() === '') {
            setError('Please fill in all required fields.');
            return;
        }
    
        const isPasswordValid = await store.checkOldPassword(store.user.id, { password: oldPassword });
        if (!isPasswordValid) {
            setError('Old password is incorrect.');
            return;
        }
    
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }
    
        if (/\s/.test(newPassword)) {
            setError('New password must not contain spaces.');
            return;
        }
    
        if (newPassword !== repeatNewPassword) {
            setError('New passwords do not match.');
            return;
        }
    
        try {
            await store.updateUser(store.user.id, { password: newPassword });
            onClose();
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password. Please try again later.');
        }
    };
    
    
    
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>✖</span>
                <h2 className="modal-title">Change Password</h2>
                {error && <div className={`error-message`} style={{textAlign:'center'}}>{error}</div>}

                <form className="modal-input" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        maxLength={16} 
                        placeholder="Old Password"
                        required
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        maxLength={16} 
                        placeholder="New Password"
                        required
                    />
                    <input
                        type="password"
                        name="repeatNewPassword"
                        value={formData.repeatNewPassword}
                        onChange={handleChange}
                        maxLength={16} 
                        placeholder="Repeat New Password"
                        required
                    />
                    <button type="submit" className="modal-submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
