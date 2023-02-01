import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import '../css/login.css';
import '../css/password.css';
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

const cookies = new Cookies();
const initialState = {
    email: '',
    username: '',
    password: '',
    url: '',
}

var passwords = [];

const achu =()=>{
    let URL = 'http://localhost:5200/password/get-passwords';
}

const getPasswords = async() =>{
    let URL = 'http://localhost:5200/password/get-passwords';
    const user = cookies.get('user')
    const answer = await axios.post(`${URL}`, {
        user
    });
    let decryptedData = decryptMessage(answer.data.data, import.meta.env.VITE_FILE_KEY)
    return decryptedData;
    // console.log(decryptedData)
    // passwords.push(decryptedData)
    //console.log(passwords)
    // decryptedData.forEach((password, index) => {
    //     passwords.push(
    //     <div key={index}>
    //         <h2>Email: {password.email}</h2>
    //         <h2>Username: {password.username}</h2>
    //         <h2>Password: {password.password}</h2>
    //         <h2>Url: {password.url}</h2>
    
    //         <hr />
    //     </div>,
    //     );
    // });
    // console.log(passwords)
}

class PasswordGallery extends React.Component {
// const PasswordGallery = () => {
    state = {
        passwords: []
    };
    //const [form, setForm] = useState(initialState);
    handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    // useEffect(() => {
    //     getPasswords();
    // }, []);
    async componentDidMount() {
        try{
            let URL = 'http://localhost:5200/password/get-passwords';
            const user = cookies.get('user')
            const answer = await axios.post(`${URL}`, {
                user
            });
            let decryptedData = decryptMessage(answer.data.data, import.meta.env.VITE_FILE_KEY)
            this.setState(state =>({passwords: decryptedData}));
        } catch{

        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
            const { email, username, password, url} = form;
            const URL = 'http://localhost:5200/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            const answer = await axios.post(`${URL}`, {
                user, email, username, password, url
            });
            console.log(answer)
            

            //window.location.reload();
        //}
    }

    render(){
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
                </form>
            </div> */}
            
            <div className="form-container">
                <div className="passwords-container">
                {console.log(this.state.passwords)}
                    {this.state.passwords.map((password, index) =>{
                        return(
                            <div id={index} key={index}>
                                {/* <div className="form-group">
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
                                </div> */}
                                <h2>Email: {password.email}</h2>
                                <h2>Username: {password.username}</h2>
                                <h2>Password: {password.password}</h2>
                                <h2>Url: {password.url}</h2>
                            </div>
                        );
                    })

                    }
                    
                </div>
            </div>
        </div>
        
    )
}}
export default PasswordGallery