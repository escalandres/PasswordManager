import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import '../css/login.css';
import '../css/password.css';
import CryptoJS from "crypto-js";
import {Button, Form, Alert, Modal, Spinner} from 'react-bootstrap';
import AlertMessage from "./AlertMessage";
import "bootstrap/dist/css/bootstrap.min.css";
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
    
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            passwords: [],
            modal: false,
            text: '',
            type: ''
        };
        this.form  = useState(initialState);
        this.setForm = useState(initialState);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenNewPassword = this.handleOpenNewPassword.bind(this);
    // handleShow = () => this.state.show = true;
    this.handleShow = () =>{
        
        this.state.show = true;
    }
    }
    toggle() {
        this.setState({modal: !this.state.modal});
    }
    handleOpenNewPassword(){
        this.setState({show: !this.state.show});
    }
    // const [form, setForm] = useState(initialState);
    handleChange = (e) => {
        this.setForm({ ...this.form, [e.target.name]: e.target.value });
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
            document.getElementById("newPasswordSpinner").classList.remove("hide")
            const { name, email, username, password, url} = form;
            const URL = 'http://localhost:5200/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            const answer = await axios.post(`${URL}`, {
                user, email, username, password, url
            });
            console.log(answer)
            if(answer.data.status === "OK"){
                document.getElementById("newPasswordSpinner").classList.add("hide")
                this.handleOpenNewPassword()
                // this.setState({modal: !this.state.modal});
                this.setState({text: "New password saved successfully!"});
                this.setState({type: "success"});
                // document.getElementById("alert-message").setAttribute("text", "New password saved successfully!")
                // document.getElementById("alert-message").setAttribute("type", "success")
                // document.getElementById("alert-container").classList.remove("hide")
                setTimeout(() => {
                    console.log('w')
                    // load.classList.add("hide")
                    document.getElementById("alert-container").classList.add("hide")
                }, 4000);
            }
            else{
                document.getElementById("newPasswordSpinner").classList.add("hide")
                this.handleOpenNewPassword()
                this.setState({text: "Error on saving password!"});
                this.setState({type: "danger"});
                // document.getElementById("message").setAttribute("text", "")
                // document.getElementById("message").setAttribute("type", "")

            }
            //window.location.reload();
        //}
    }

    render(){
    return(
        <div className="" id="">
            <div id="alert-container" className="alert-container hide">
                <AlertMessage id="message" text={this.state.text} type={this.state.type} />            
            </div>
            
            <Button onClick={this.handleOpenNewPassword} variant="success">Create new Password</Button>

        <h1>H</h1>
                <Modal
                    onHide={this.toggle}
                    show={this.state.modal}
                >
                    
                    <Modal.Dialog>
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
                    <Button variant="secondary" onClick={this.toggle}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                    </Modal.Dialog>
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
                                    <Button onClick={this.toggle}>Show Data</Button>
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
            <Modal
                    onHide={this.handleOpenNewPassword}
                    show={this.state.show}
                    id="newPassword-modal"
                >
                    
                    <Modal.Dialog>
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <div id="newPasswordSpinner" className="hide"><Spinner id="" animation="border"  />;</div>
                            
                            <Modal.Title id="modalName">Create a new password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Page Name</Form.Label>
                                <Form.Control id="newPasswordName" name="name" type="text" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Email</Form.Label>
                                <Form.Control id="newPasswordEmail" name="email" type="email" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Username</Form.Label>
                                <Form.Control id="newPasswordUsername" name="username" type="text" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Password</Form.Label>
                                <Form.Control id="newPasswordPassword" name="password" type="password" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Website</Form.Label>
                                <Form.Control id="newPasswordUrl" name="url" type="url" onChange={this.handleChange}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.toggle}>
                                Close
                            </Button>
                            <Button>Save Password</Button>
                        </Modal.Footer>
                    </Form>
                    </Modal.Dialog>
                </Modal>
            </div>
        </div>
        
    )
}}
export default PasswordGallery