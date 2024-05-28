import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import UserService from '../../services/UserService';
import { IUser } from '../../models/IUser';
import AdminHeader from './AdminHeader';
import Footer from '../Footer/Footer';
import styles from './AdminPanel.module.css';
import userDeffault from '../../images/round-account-button-with-user-inside_icon-icons.com_72596.png';
import Main from '../main/main';
const AdminPanel = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const defaultValues = {
    email: "",
    role: "",
    isActivated: "",
  };

  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    if (!store.isAuth && localStorage.getItem('token')) {
      store.checkAuth();
    }
    getUsers();
  }, []);
  
  if (store.isLoading) {
    return <div>Загрузка...</div>
}

if (!store.isAuth || store.user.role !== 1) {
  if(store.user.role === 2){
    navigate('/emp')
  }
  else{
    navigate('/')
  }
  
}
  useEffect(() => {
    filterUsers();
  }, [values, users]);

 
  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      setFilteredUsers(response.data); // Set both users and filteredUsers
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const getRoleText = (role: number) => {
    switch (role) {
      case 0:
        return "User";
      case 1:
        return "Administrator";
      case 2:
        return "Employee";
      default:
        return "Unknown";
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const filterUsers = () => {
    const filtered = users.filter(user => {
      return (
        (values.email === "" || user.email.includes(values.email)) &&
        (values.role === "" || user.role.toString() === values.role) &&
        (values.isActivated === "" || user.isActivated.toString() === values.isActivated)
      );
    });
    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setValues(defaultValues);
    setFilteredUsers(users);
  };

  return (
    <div className="App">
      <AdminHeader />
      <div className={styles.maincontainer}>
        <form className={styles.filters}>
          <div className={styles.filter}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.filter}>
            <select name="role" value={values.role} onChange={handleChange}>
              <option value="">Role</option>
              <option value="0">User</option>
              <option value="1">Administrator</option>
              <option value="2">Employee</option>
            </select>
          </div>
          <div className={styles.filter}>
            <select name="isActivated" value={values.isActivated} onChange={handleChange}>
              <option value="">Activation Status</option>
              <option value="true">Activated</option>
              <option value="false">Not Activated</option>
            </select>
          </div>
          <div className={styles.back}>
          <button type="button"  onClick={handleReset}>Reset</button></div>
        </form>

        <div className={styles.usersContainer}>
          {filteredUsers.map(user => (
            <div
              key={user._id}
              className={styles.userPanel}
              onClick={() => handleUserClick(user._id)}
            >
              <img className={styles.image} src={userDeffault} alt="User" />
              <div>ID: {user._id}</div>
              <div>Email: {user.email}</div>
              <div>Activated: {user.isActivated ? "Yes" : "No"}</div>
              <div>Role: {getRoleText(user.role)}</div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;
