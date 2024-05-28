import React, { FC, useContext } from 'react';
import '../modal/modal.css';
import { useParams } from 'react-router-dom';
import { Context } from '../..';

interface ConfirmRentProps {
    onClose: () => void;
    price: number;
    period: string;
    userId: string;
    productId:string;
}

const ConfirmRent: FC<ConfirmRentProps> = ({ onClose, price, period, userId ,productId}) => {
    const { store } = useContext(Context);
    const periodNumber = parseInt(period);
    
    const handleConfirm = async () => {
        try {
            
            const data = { price: price*periodNumber, period:periodNumber, user_id:userId};
            console.log(data)
            await store.rentReq(productId, data);
            onClose();
        } catch (error) {
            console.error("Error confirming rent:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>✖</span>
                <h2 className="modal-title">Confirm Rent</h2>
                <p className='modal-text'>Are you sure you want to confirm this rental?</p>
                <div className="modal-actions">
                    <button onClick={handleConfirm} className="modal-submit-btn">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRent;
