import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';


const cookies = new Cookies();
const Login = () => {
    React.useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const logInButton = document.getElementById('logIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        logInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    const [isSignup, setIsSignup] = useState(true);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const data = {
        name: '',
        email: '',
        password: ''
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!captcha.current.getValue()){
            Toastt();
            Alertt();
        }
        else{
            const { username, password, phoneNumber, avatarURL } = form;

            const URL = 'http://localhost:5000/auth';
            //const URL = 'https://chat-app-project-ing-web.herokuapp.com/auth';

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


    return(
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1 className="h1-black">Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faFacebook}/>
                        </a>
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faGooglePlusG} />
                        </a>
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container log-in-container">
                <form action="#">
                    <h1 className="h1-black">Log in</h1>
                    <div className="social-container">
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faFacebook}/>
                        </a>
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faGooglePlusG} />
                        </a>
                        <a href="#" className="social">
                        <FontAwesomeIcon className="icon" icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" className="mb" placeholder="Password" />
                    <a href="#">Forgot your password?</a>
                    <button>Log In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account? Log In</p>
                        <button className="ghost" id="logIn">Log In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, There!</h1>
                        <p>Don't have an account? Sign Up Free</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Login