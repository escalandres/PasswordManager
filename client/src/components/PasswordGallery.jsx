import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import '../css/login.css';
import '../css/password.css';
import CryptoJS from "crypto-js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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


class PasswordGallery extends React.Component {
// const PasswordGallery = () => {
    state = {
        passwords: []
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
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

    async handleSubmit(e){
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
        <div className="" id="">
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
            
            <div className="">
                <div className="passwords-container">
                {console.log(this.state.passwords)}
                    {this.state.passwords.map((password, index) =>{
                        return(
                            <div className="password-container" id={index} key={index}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className="form-group">
                                        <Form.Label className="label">Email</Form.Label>
                                        <Form.Control name="email" type="email" value={password.email} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <div className="form-group">
                                        <label className="label">Username</label>
                                        <input name="username" type="text" value={password.username} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Password</label>
                                        <input name="password" type="password" value={password.password} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Website</label>
                                        <input name="url" type="url" value={password.url} onChange={this.handleChange}/>
                                    </div>
                                    {/* <h2>Email: {password.email}</h2>
                                    <h2>Username: {password.username}</h2>
                                    <h2>Password: {password.password}</h2>
                                    <h2>Url: {password.url}</h2> */}
                                </Form>
                            </div>
                            
                        );
                    })

                    }
                    
                    <FontAwesomeIcon className="load-icon fa-pulse fa-3x fa-fw" icon={faSpinner} />

                </div>
            </div>
        </div>
        
    )
}}
export default PasswordGallery