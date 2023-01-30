import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';


const cookies = new Cookies();
const initialState = {
    email: '',
    username: '',
    password: '',
    url: '',
}

const passwords = [];

const PasswordGallery = () => {
    const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        getPasswords();
    }, []);
    const getPasswords = async() =>{
        let URL = 'http://localhost:5200/password/get-passwords';
        const user = cookies.get('user')
        const token = user.token;
        const answer = await axios.post(`${URL}`, {
            token
        });
        if(answer.data.status === 'OK'){
            answer.data.data.forEach((data) => {
                passwords.push(
                    <div className="passwords-container">
                        <diiv className="form-group">
                            <label className="label">Email</label>
                            <input name="email" type="email" value={data.email} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Username</label>
                            <input name="username" type="text" value={data.username} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Password</label>
                            <input name="password" type="password" value={data.password} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Website</label>
                            <input name="url" type="url" value={data.url} />
                        </diiv>
                    </div>
                    
                );
            });
        }
        else{
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!captcha.current.getValue()){
        //     Toastt();
        //     Alertt();
        // }
        // else{
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
                const user = cookies.get('user')
                const token = user.token;
                console.log(user.email)
                const result = await axios.post('http://localhost:5200/login/verify', {
                    token
                });
                
                console.dir(result)
                if(result.data.message === "invalid token"){
                    alert('Debe ingresar su email')
                }
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
        <div className="container" id="container">
            <div className="form-container new-password-container">
                <form action="#" onSubmit={handleSubmit}>
                    <h1 className="h1-black">Create a new password</h1>
                        <input type="email" placeholder="Email" name="email"
                            onChange={handleChange}/>
                        <input type="text" placeholder="username" name="username"
                            onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password"
                            onChange={handleChange}/>
                            <input type="url" placeholder="Url" name="url"
                            onChange={handleChange}/>
                        <button>Save Password</button>
                </form>
            </div>
            <div className="form-container passwords-container">
            
                <form onSubmit={handleSubmit}>
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
                        <input type="email" placeholder="Email" name="lemail"
                            onChange={handleChange}/>
                        <input type="password" className="mb" placeholder="Password" name="lpassword"
                            onChange={handleChange}/>
                        <a href="/change-password">Forgot your password?</a>
                        <button>Log In</button>
                </form>
            </div>
        </div>
        
    )
}
export default PasswordGallery