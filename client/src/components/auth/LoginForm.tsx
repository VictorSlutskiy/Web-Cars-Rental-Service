import React, { FC, useContext, useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import './signup.css';
import logoImg from './../../img/icons/logo.svg';
import leftArrow from './../../img/icons/left-arrow.svg';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [errorClass, setErrorClass] = useState<string>('');
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const { store } = useContext(Context);

    const handleButtonClick = async () => {
        try {
            if (isLoginMode) {
                if (!email || !password) {
                    setError('Email and password are required');
                    return;
                }
               
                const response = await store.login(email, password);
                if (response === 400) {
                    setError('Incorrect email or password');
                    return;
                }
            } else {
                if (!email || !password || !confirmPassword) {
                    setError('All fields are required');
                    return;
                }
                if (password.length < 8) {
                    setError('Password must be at least 8 characters long');
                    return;
                }
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
                const response = await store.registration(email, password);
                if (response === 400) {
                    setError('Email is already taken');
                    return;
                }
            }
            setError('');
            setErrorClass('error-animate');
            setTimeout(() => {
                setErrorClass('');
            }, 1000);
            
            
        } catch (error:any) {
            if (error.response && error.response.status === 400) {
                // Handle 400 error for login and registration
                if (isLoginMode) {
                    setError('Incorrect email or password');
                } else {
                    setError('Email is already taken');
                }
            } else {
                setError('An error occurred');
            }
        }
    };
    
    const toggleMode = () => {
        setIsLoginMode(prevMode => !prevMode);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div>
            <div className="header__row">
                <a href="/">
                    <div className="Container_back">
                        <img src={leftArrow} alt="Back" />
                        <span className="back_title">Back</span>
                    </div>
                </a>
            </div>
            <div className='signup-container'>
                <div className='signup__content'>
                    <div className='name'>
                        <img src={logoImg} alt="Logo" />
                        <h1>CARS RENTAL SERVICE</h1>
                    </div>
                    {error && <div className={`error-message ${errorClass}`}>{error}</div>}
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        maxLength={30} 
                        placeholder='Email'
                    />
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        maxLength={16} 
                        placeholder='Password'
                    />
                    {!isLoginMode && (
                        <input
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            maxLength={16} 
                            placeholder='Confirm Password'
                        />
                    )}
                    <button onClick={handleButtonClick}>
                        {isLoginMode ? 'Log In' : 'Sign Up'}
                    </button>
                    <div className='toggle'>
                        <button onClick={toggleMode}>
                            {isLoginMode ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(LoginForm);
