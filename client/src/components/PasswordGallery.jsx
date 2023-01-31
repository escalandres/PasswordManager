import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';
// import dotenv from 'dotenv'

import CryptoJS from "crypto-js";

function encryptMessage(data, key){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return ciphertext;
}   

function decryptMessage(ciphertext, key){
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}



const cookies = new Cookies();
const initialState = {
    email: '',
    username: '',
    password: '',
    url: '',
}

// dotenv.config()
const passwords = [];

const achu =()=>{
    let URL = 'http://localhost:5200/password/get-passwords';
}

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
        console.log('hola')
        console.log(user)
        const token = user.token;
        const answer = await axios.post(`${URL}`, {
            user
        });
        //import.meta.env.REACT_APP_FILE_SECRET
        //console.dir(answer)
        //console.dir(answer.data.status)
        console.dir(answer.data.data)
        var decryptedData = decryptMessage(answer.data.data, '7@Q@Aq!d?Q&N6Dh$g3MF$Yr8sQRnhbrYRCEi@CTm')
        console.log('Hasta aqui')
        console.log(decryptedData)
        console.log('mensaje')
        console.log(typeof(decryptedData))
        console.log(decryptedData[0])
        // console.log('SECRET: '+'7@Q@Aq!d?Q&N6Dh$g3MF$Yr8sQRnhbrYRCEi@CTm')
        // let result = decrypt(answer.data.data.data,'7@Q@Aq!d?Q&N6Dh$g3MF$Yr8sQRnhbrYRCEi@CTm')
        // console.dir(result)
        // console.dir(JSON.parse(result))
        if(answer.data.status === "OK"){
            decryptedData.forEach((password, index) => {
                console.log(data)
                passwords.push(
                    <div className="passwords-container" key={index}>
                        <diiv className="form-group">
                            <label className="label">Email</label>
                            <input name="email" type="email" value={password.email} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Username</label>
                            <input name="username" type="text" value={password.username} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Password</label>
                            <input name="password" type="password" value={password.password} />
                        </diiv>
                        <diiv className="form-group">
                            <label className="label">Website</label>
                            <input name="url" type="url" value={password.url} />
                        </diiv>
                    </div>
                    
                );
                console.log(passwords)
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
            <div className="form-container log-in-container new-password-container">
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
            </div>
            
            <div className="form-container sign-up-container">
                {passwords}
                <form onSubmit={handleSubmit}>
                    
                </form>
            </div>
        </div>
        
    )
}
export default PasswordGallery