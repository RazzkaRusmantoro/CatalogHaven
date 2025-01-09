import React, { useState, useEffect } from 'react';
import './login.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearErrors } from '../../actions/userActions';
import { Link } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, error, isAuthenticated } = useSelector((state) => state.user);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [registerData, setRegisterData] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Successfully authenticated');
            toast.success("Successful!");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else if (error && error !== "Login to access this resource") {
            console.log('Error: ', error);
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [navigate, isAuthenticated, error, dispatch]);
    

    const loginUser = async (e) => {
        e.preventDefault();
        dispatch(login(loginData.email, loginData.password));
    };

    const registerUser = async (e) => {
        e.preventDefault();
        dispatch(register(registerData.fname, registerData.lname, registerData.email, registerData.username, registerData.password));
    };

    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    return (
        <>
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className="curved-shape"></div>
                {/* Login Form */}
                <div className="login-box">
                    <h2 id="login-title">LOGIN</h2>
                    <hr id="hr2" />
                    <form className="form" onSubmit={loginUser}>
                        <div className="input-container">
                            <div className="input-group">
                                <label htmlFor="email" className="icon-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                                    </svg>
                                </label>
                                <input type="email" value = {loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})} className="inputs" id="email" placeholder="Email" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password" className="icon-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                                    </svg>
                                </label>
                                <input type="password"  value = {loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="inputs" id="password" placeholder="Password" required/>
                            </div>
                        </div>
                        {/* <div className="error-message">
                            Please enter the correct email and password.
                        </div> */}
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                        <div className="regi-text">
                            Not registered? <a href="#" className="regi-link" onClick={handleRegisterClick}>Create an account!</a>
                        </div>
                    </form>
                </div>
                {/* Register Form */}
                <div className="register-box">
                    <h2 className="register-title">SIGN UP</h2>
                    <hr id="hr3" />
                    <form onSubmit={registerUser} className="form">
                        <div className="input-container-regi">
                            <div className="input-group-regi">
                                <label htmlFor="fname" className="icon-label-regi">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                                    </svg>
                                </label>
                                <input value = {registerData.fname} onChange={e => setRegisterData({...registerData, fname: e.target.value})} type="text" className="inputs-regi" id="fname" placeholder="First Name" required />
                            </div>  
                            <div className="input-group-regi">
                                <label htmlFor="lname" className="icon-label-regi">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                                    </svg>
                                </label>
                                <input value = {registerData.lname} onChange={e => setRegisterData({...registerData, lname: e.target.value})} type="text" className="inputs-regi" id="lname" placeholder="Last Name" required />
                            </div>
                            <div className="input-group-regi">
                                <label htmlFor="email" className="icon-label-regi">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                                    </svg>
                                </label>
                                <input value = {registerData.email} onChange={e => setRegisterData({...registerData, email: e.target.value})} type="email" className="inputs-regi" id="email-regi" placeholder="Email" required />
                            </div>
                            <div className="input-group-regi">
                                <label htmlFor="username" className="icon-label-regi">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                                    </svg>
                                </label>
                                <input value = {registerData.username} onChange={e => setRegisterData({...registerData, username: e.target.value})} type="text" className="inputs-regi" id="username" placeholder="Username" required />
                            </div>
                            <div className="input-group-regi">
                                <label htmlFor="password" className="icon-label-regi">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                                    </svg>
                                </label>
                                <input value = {registerData.password} onChange={e => setRegisterData({...registerData, password: e.target.value})} type="password" className="inputs-regi" id="password-regi" placeholder="Password" required />
                            </div>
                        </div>
                        {/* {error && <div className="error-message">{error}</div>} */}
                        <div className="button-container-regi">
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className="login-text">
                            Already have an account? <a href="#" className="regi-link" onClick={handleLoginClick}>Sign in!</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
