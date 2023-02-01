import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';
import CryptoJS from "crypto-js";
let i = 1;
function encryptMessage(data){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_FILE_KEY).toString();
    return ciphertext;
}   

function decryptMessage(ciphertext){
    var bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_FILE_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

var decryptedData = [{}];

const cookies = new Cookies();
const initialState = {
    email: '',
    username: '',
    password: '',
    url: '',
}

const passwords = [];

const achu =()=>{
    let URL = 'http://localhost:5200/password/get-passwords';
}

const getPasswords = async() =>{
    let URL = 'http://localhost:5200/password/get-passwords';
    const user = cookies.get('user')
    const answer = await axios.post(`${URL}`, {
        user
    });
    decryptedData = decryptMessage(answer.data.data, import.meta.env.VITE_FILE_KEY)
    console.log(decryptedData[0])
}

const PasswordGallery = () => {
    const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        getPasswords();
    }, []);


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
            {/* <div className="form-container log-in-container new-password-container">
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
                        <button onClick={achu}>Achu</button>
                </form>
            </div> */}
            
            <div className="form-container">
                <div className="passwords-container">
                    {decryptedData.map((password, index) =>{
                        return(
                            <div key={index}>
                                <div className="form-group">
                                    <label className="label">Email</label>
                                    <input name="email" type="email" value={password.email} />
                                </div>
                                <div className="form-group">
                                    <label className="label">Username</label>
                                    <input name="username" type="text" value={password.username} />
                                </div>
                                <div className="form-group">
                                    <label className="label">Password</label>
                                    <input name="password" type="password" value={password.password} />
                                </div>
                                <div className="form-group">
                                    <label className="label">Website</label>
                                    <input name="url" type="url" value={password.url} />
                                </div>
                            </div>
                        );
                    })

                    }
                    
                </div>
            </div>
        </div>
        
    )
}
export default PasswordGallery