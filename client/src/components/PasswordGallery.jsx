import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import '../css/login.css';
import '../css/password.css';
import CryptoJS from "crypto-js";
import {Button, Form, Alert, Modal} from 'react-bootstrap';

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
    name: '',
    email: '',
    username: '',
    password: '',
    url: '',
}

var passwords = [];

function passData(name,email,username,password,url){
    // document.getElementById('modalName').value = name;
    // document.getElementById('modalEmail').value = email;
    // document.getElementById('modalUsername').value = username;
    // document.getElementById('modalPassword').value = password;
    // document.getElementById('modalUrl').value = url;
    document.getElementById('modalName').setAttribute('value', name);
    document.getElementById('modalEmail').setAttribute('value', email);
    document.getElementById('modalUsername').setAttribute('value', username);
    document.getElementById('modalPassword').setAttribute('value',password);
    document.getElementById('modalUrl').setAttribute('value', url);
}

// function PasswordGallery () {
class PasswordGallery extends React.Component {
// const PasswordGallery = () => {
    state = {
        show: false,
        passwords: []
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = () => this.state.show = false;
    // handleShow = () => this.state.show = true;
    this.handleShow = () =>{
        
        this.state.show = true;
        alert(this.state.show)
    }
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
        <h1>H</h1>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    
                    
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                        <Modal.Title id="modalName">LLLL</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form.Group className="form-group">
                            <Form.Label className="label" >Email</Form.Label>
                            <Form.Control id="modalEmail" name="email" type="email" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control id="modalUsername" name="username" type="text" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control id="modalPassword" name="password" type="password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Website</Form.Label>
                            <Form.Control id="modalUrl" name="url" type="url" onChange={this.handleChange}/>
                        </Form.Group>
                        {/* <Button onClick={() => {this.handleShow;passData(password.name, password.email, password.username, password.password, password.url)}}>Show Data</Button> */}
                        {/* <h2>Email: {password.email}</h2>
                        <h2>Username: {password.username}</h2>
                        <h2>Password: {password.password}</h2>
                        <h2>Url: {password.url}</h2> */}
                        </Modal.Body>
                    </Form>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
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
                                        <Form.Text className="text-muted">{password.name}</Form.Text>
                                    </Form.Group>
                                    {/* <Form.Group className="form-group">
                                        <Form.Label className="label">Email</Form.Label>
                                        <Form.Control name="email" type="email" value={password.email} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="label">Username</Form.Label>
                                        <Form.Control name="username" type="text" value={password.username} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="label">Password</Form.Label>
                                        <Form.Control name="password" type="password" value={password.password} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="label">Website</Form.Label>
                                        <Form.Control name="url" type="url" value={password.url} onChange={this.handleChange}/>
                                    </Form.Group> */}
                                    {/* <Button onClick={() => {this.handleShow;passData(password.name, password.email, password.username, password.password, password.url)}}>Show Data</Button> */}
                                    <Button onClick={this.handleShow}>Show Data</Button>
                                    {/* <Button onClick={passData(password.name, password.email, password.username, password.password, password.url)}>Show Data</Button> */}
                                    {/* <h2>Email: {password.email}</h2>
                                    <h2>Username: {password.username}</h2>
                                    <h2>Password: {password.password}</h2>
                                    <h2>Url: {password.url}</h2> */}
                                </Form>
                            </div>
                            
                        );
                    })

                    }
                    
                    {/* <FontAwesomeIcon className="load-icon fa-pulse fa-3x fa-fw" icon={faSpinner} /> */}
                    {/* <Alert id="alert" variant="danger" fade="false" show="true">
                    ¡El email y/o contraseña son incorrectos!
                </Alert> */}
                </div>
            </div>
            <div>
            
            </div>
        </div>
        
    )
}}
export default PasswordGallery