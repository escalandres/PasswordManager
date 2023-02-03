import React, { Component, useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import AlertMessage from "./AlertMessage";
// import {Alert} from 'react-bootstrap/';
import Alert from 'react-bootstrap/Alert';

//


const cookies = new Cookies();
const initialState = {
    sname: '',
    semail: '',
    spassword: '',
    lemail: '',
    lpassword: ''
}

const load = document.getElementById("load-container");


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
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [show, setShow] = React.useState(false)
    const [isSignup, setIsSignup] = useState(false);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!captcha.current.getValue()){
        //     Toastt();
        //     Alertt();
        // }
        // else{
            // load.classList.remove("hide")
            document.getElementById("load-container").classList.remove("hide")
            const { sname, semail, spassword, lemail, lpassword} = form;
            
            const URL = 'http://localhost:5200/auth';
            //if(sname&&semail&&)

            //const URL = 'https://chat-app-project-ing-web.herokuapp.com/auth';

            // const { data: { token, userId, name, email, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            //     sname, semail, spassword, lemail, lpassword,
            // });
            const answer = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                sname, semail, spassword, lemail, lpassword,
            });
            console.dir(answer)
            if(answer.data.status === "ok"){
                cookies.set('user', answer.data.data,{
                    maxAge: 60 * 60 * 4,
                    sameSite: true
                });
                setTimeout(() => {
                    // load.classList.add("hide")
                    document.getElementById("load-container").classList.add("hide")
                    navigate("/password-gallery");
                }, 2000);
                
            }
            else{
                setTimeout(() => {
                    console.log('p')
                    document.getElementById("load-container").classList.add("hide")
                    document.getElementById("alert-container").classList.remove("hide")
                }, 2000);

                setTimeout(() => {
                    console.log('w')
                    // load.classList.add("hide")
                    document.getElementById("alert-container").classList.add("hide")
                }, 4000);
            }
            
            // cookies.set('token', token);
            // cookies.set('username', username);
            // cookies.set('fullName', fullName);
            // cookies.set('userId', userId);

            // if(isSignup) {
            //     cookies.set('phoneNumber', phoneNumber);
            //     cookies.set('avatarURL', avatarURL);
            //     cookies.set('hashedPassword', hashedPassword);
            // }

            //window.location.reload();
        //}
    }


    return(
        <div className="body">
            <div id="alert-container" className="alert-container hide">
                <AlertMessage type="danger" text="¡El email y/o contraseña son incorrectos!"/>
            </div>
            <div id="load-container" className="load-container hide">
                <FontAwesomeIcon className="load-icon fa-pulse fa-3x fa-fw" icon={faSpinner} />
            </div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#" onSubmit={handleSubmit}>
                        <h1 className="h1-black pm-h1">Create Account</h1>
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
                            <input className="pm-input" type="text" placeholder="Name" name="sname"
                                onChange={handleChange}/>
                            <input className="pm-input" type="email" placeholder="Email" name="semail"
                                onChange={handleChange}/>
                            <input className="pm-input" type="password" placeholder="Password" name="spassword"
                                onChange={handleChange}/>
                            <button className="pm-btn">Sign Up</button>
                    </form>
                </div>
                <div className="form-container log-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h1-black pm-h1">Log in</h1>
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
                            <input className="pm-input" type="email" placeholder="Email" name="lemail"
                                onChange={handleChange}/>
                            <input className="pm-input" type="password" placeholder="Password" name="lpassword"
                                onChange={handleChange}/>
                            <a className="pm-a" href="/change-password">Forgot your password?</a>
                            <button className="pm-btn">Log In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="pm-h1">Welcome Back!</h1>
                            <p>Already have an account? Log In</p>
                            <button className="pm-btn ghost" id="logIn" onClick={switchMode}>Log In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="pm-h1">Hello, There!</h1>
                            <p>Don't have an account? Sign Up Free</p>
                            <button className="pm-btn ghost" id="signUp" onClick={switchMode}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login