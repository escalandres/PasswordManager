import React, { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Button, Alert, ToastContainer, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/fontawesome-free-solid';
import ReCAPTCHA from "react-google-recaptcha";
// import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

function onChange(value) {
    console.log("Captcha value:", value);
}

function Toastt(){
    const toa = document.getElementById('toast-container');
    toa.classList.remove('hidden');
    setTimeout(() => {  toa.classList.add('hidden'); }, 3000);
}

function Alertt(){
    const ale = document.getElementById('alert-container');
    ale.classList.remove('hidden');
    setTimeout(() => {  ale.classList.add('hidden'); }, 3000);
}

const Auth = () => {
    const captcha = useRef(null);
    // const [captchaValido, cambiarCaptchaValido] = useState(null);
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!captcha.current.getValue()){
            Toastt();
            Alertt();
        }
        else{
            const { username, password, phoneNumber, avatarURL } = form;

            //const URL = 'http://localhost:5000/auth';
            const URL = 'https://chat-app-project-ing-web.herokuapp.com/auth';

            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if(isSignup) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                            
                        <ReCAPTCHA
                            ref={captcha}
                            //  6Lc1n1IgAAAAABhcRg2DuVhz5q_j9mm8xGmfCLRE
                            sitekey="6Lc1n1IgAAAAAFz7KKYOvoFg2WS5Z2WeOwWaEmfQ"
                            onChange={onChange}
                        />
                        <Alert key='warning' variant="warning" id="alert-container" className="hidden">
                            Debe llenar el captcha
                        </Alert>
                        <ToastContainer id="toast-container" className="hidden">
                            <Toast>
                                <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Bootstrap</strong>
                                <small className="text-muted">just now</small>
                                </Toast.Header>
                                <Toast.Body>Llene el captcha</Toast.Body>
                            </Toast>
                        </ToastContainer>
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                            ? "Already have an account?" 
                            : "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                            {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div> 
            </div>
            <Button id="float-btn" variant="primary" style={{position: 'fixed', top: '80%', right: 70}}>
                <a className="a-btn" href="/"><FontAwesomeIcon className="fa-solid home-btn__icon" icon={faHome} /></a>
            </Button>
        </div>
    )
}

export default Auth
