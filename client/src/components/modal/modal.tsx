import React, { FC } from 'react';
import './modal.css';

interface ModalProps {
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Please log in</h2>
                <p className="modal-text">You need to be logged in to access this feature. Please log in or sign up.</p>
                <button className="modal-ok-btn" onClick={onClose}>OK</button>
                <a href='/auth' className='modal-link'>log in</a>
            </div>
        </div>
    );
};

export default Modal;

