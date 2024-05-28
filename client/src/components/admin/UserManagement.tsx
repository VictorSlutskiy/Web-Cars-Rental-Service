import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import styles from './UserManagement.module.css';
import { IUser } from '../../models/IUser';
import AuthService from '../../services/AuthService';
import userDeffault from '../../images/round-account-button-with-user-inside_icon-icons.com_72596.png';
import AdminHeader from './AdminHeader';
import Footer from '../Footer/Footer';

const UserManagement = () => {
  const { userId } = useParams<{ userId: string }>();
 
  const [role, setRole] = useState<number | string>('');
  const [user, setUser] = useState<IUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateRoleModal, setShowUpdateRoleModal] = useState(false);
  const [updatedRole, setUpdatedRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      if (!userId) {
        console.error('User ID is undefined');
        return;
      }

      try {
        const response = await UserService.getUserById(userId);
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user:', error);
        
      }
    }

    fetchUser();
  }, [userId, navigate]);

  const handleDeleteUser = async () => {
    if (!userId) return;

    try {
      await UserService.deleteUser(userId);
      navigate('/admin'); 
      
    } catch(e) {
      console.log(e)
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    if (!userId) return;
    const roleString = String(role);
    try {
      const roleNumber: number = typeof role === 'string' ? parseInt(role) : role;
      const updatedUserData = { role: role }; 
      await AuthService.updateUser(userId, updatedUserData);
      setUser((prevUser) => prevUser ? { ...prevUser, role: roleNumber } : null);
      setShowUpdateRoleModal(true);
      setUpdatedRole(roleString);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const closeUpdateRoleModal = () => {
    setShowUpdateRoleModal(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <AdminHeader />
      <div className={styles.maincontainer}>
        <div className={styles.userManagement}>
          <h2>User Management: {user.email}</h2>
          <div className={styles.userInfo}>
            <img className={styles.userImage} src={userDeffault} alt="User" />
            <div className={styles.userData}>
              <div>ID: {user._id}</div>
              <div>Email: {user.email}</div>
              <div>Activated: {user.isActivated ? "Yes" : "No"}</div>
              <div>
                Role:
                <select value={role} onChange={handleRoleChange}>
                  <option value="0">User</option>
                  <option value="1">Administrator</option>
                  <option value="2">Employee</option>
                </select>
                <button onClick={handleUpdateRole}>Update Role</button>
              </div>
            </div>
            <button onClick={openDeleteModal} className={styles.deleteButton}>Delete User</button>
          </div>
        </div>
        <Footer />
      </div>
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this user?</p>
            <div className={styles.modalActions}>
              <div className={styles.modalCancel}><button onClick={closeDeleteModal}>No</button></div>
              <button onClick={handleDeleteUser}>Yes</button>
            </div>
          </div>
        </div>
      )}
      {showUpdateRoleModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Role successfully updated to {updatedRole === "0" ? "User" : updatedRole === "1" ? "Administrator" : "Employee"}.</p>
            <div className={styles.modalActions}>
              <button onClick={closeUpdateRoleModal}>Close</button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default UserManagement;
