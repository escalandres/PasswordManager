import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
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
import { decryptMessage, encryptMessage } from "../../functions/encryption";

// function encryptMessage(data){
//     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_FILE_KEY).toString();
//     return ciphertext;
// }   

// function decryptMessage(ciphertext){
//     var bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_FILE_KEY);
//     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     return decryptedData
// }

const cookies = new Cookies();
const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    url: '',
}

const data = {
    name: '',
    email: '',
    username: '',
    password: '',
    url: '',
}

const initialPass = [];
const initialBool = false;
var pass = [];
const state = {
    show: false,
    passwords: [],
    modal: false,
    text: '',
    type: ''
};

function passData(passwordData){
    data.name = passwordData.name;
    data.email = passwordData.email;
    data.username = passwordData.username;
    data.password = passwordData.password;
    data.url = passwordData.url;
}

const PasswordGallery = () => {
    const [passwords, setPasswords] = useState(initialPass);
    const [modal, setModal] = useState(initialBool);
    const [show, setShow] = useState(initialBool);
    const navigate = useNavigate();
    React.useEffect(() => {
        
        const fetchData = async () =>{
            try{
                let URL = import.meta.env.VITE_SERVER+"/password/get-passwords";
                const user = cookies.get('user')
                const answer = await axios.post(`${URL}`, {
                    user
                });
                let decryptedData = decryptMessage(answer.data.data)
                
                pass = decryptedData;
                setPasswords((passwords) => decryptedData); 
                //state.passwords = decryptedData;
            } catch{
    
            }
        }
        if(cookies.get('user')){
            // call the function
            fetchData()
                // make sure to catch any error
                .catch(console.error);
        }
        else{
            navigate("/");
        }
        
    }, []);
    const handleShow = () =>{
        setShow((show) => !show);
    }

    const [form, setForm] = useState(initialState);
    
    const toggle = () =>{
        setModal((modal) => !modal);
    }
    const handleOpenNewPassword = () =>{
        setShow((show) => !show);
    }
    // const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            document.getElementById("newPasswordSpinner").classList.remove("hide")
            const { name, email, username, password, url} = form;
            const URL = 'http://localhost:5200/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            const answer = await axios.post(`${URL}`, {
                name, user, email, username, password, url
            });
            console.log(answer)
            if(answer.data.status === "OK"){
                document.getElementById("newPasswordSpinner").classList.add("hide")
                handleOpenNewPassword()
                // this.setState({modal: !this.state.modal});
                state.text = "New password saved successfully!";
                state.type = "success";
                // document.getElementById("alert-message").setAttribute("text", "New password saved successfully!")
                // document.getElementById("alert-message").setAttribute("type", "success")
                // document.getElementById("alert-container").classList.remove("hide")
                setTimeout(() => {
                    console.log('w')
                    // load.classList.add("hide")
                    document.getElementById("alert-container").classList.add("hide")
                    window.location.reload();
                }, 4000);
            }
            else{
                document.getElementById("newPasswordSpinner").classList.add("hide")
                handleOpenNewPassword()
                state.text = "Error on saving password!";
                state.type = "danger";
                // document.getElementById("message").setAttribute("text", "")
                // document.getElementById("message").setAttribute("type", "")

            }
            //window.location.reload();
        //}
    }

    return(
        <div className="password-table" id="">
            <div id="alert-container" className="alert-container hide">
                <AlertMessage id="message" text={state.text} type={state.type} />            
            </div>
            
            <Button onClick={handleOpenNewPassword} variant="success">Create new Password</Button>
        <h1>H</h1>
            <div className="table-container">
                <table className="">
                    <thead>
                        <tr>
                            <td>ITEM NAME</td>
                            <td>LAST USED</td>
                            <td>CATEGORY</td>
                        </tr>
                    </thead>
                    <tbody>
                    {pass.map((password, index) =>{
                        return(
                            <tr>
                                <td>
                                    <div className="password-container" id={index} key={index} onClick={() => {toggle();passData(pass[index])}}>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="form-group">
                                                <Form.Label className="text-muted">{password.name}</Form.Label>
                                                <Form.Text className="">{password.email}</Form.Text>
                                            </Form.Group>
                                            {/* <Button onClick={() => {toggle();passData(pass[index])}}>Show Data</Button> */}
                                        </Form>
                                    </div>
                                </td>
                                <td>Yesterday</td>
                                <td>Social Page</td>
                            </tr>
                            
                            
                        );
                    })

                    }
                    </tbody>
                </table>
            </div>
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
                
                    
                    
                    {/* <FontAwesomeIcon className="load-icon fa-pulse fa-3x fa-fw" icon={faSpinner} /> */}
                    {/* <Alert id="alert" variant="danger" fade="false" show="true">
                    ¡El email y/o contraseña son incorrectos!
                </Alert> */}
                </div>
            </div>
            <div>
            <Modal
                    onHide={toggle}
                    show={modal}
                >
                    
                    <Modal.Dialog>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                        <Modal.Title id="modalName">{data.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form.Group className="form-group">
                            <Form.Label className="label" >Email</Form.Label>
                            <Form.Control id="modalEmail" name="email" type="email" value={data.email} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control id="modalUsername" name="username" type="text" value={data.username} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control id="modalPassword" name="password" type="password" value={data.password} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Website</Form.Label>
                            <Form.Control id="modalUrl" name="url" type="url" value={data.url} onChange={handleChange}/>
                        </Form.Group>
                        {/* <Button onClick={() => {this.handleShow;passData(password.name, password.email, password.username, password.password, password.url)}}>Show Data</Button> */}
                        {/* <h2>Email: {password.email}</h2>
                        <h2>Username: {password.username}</h2>
                        <h2>Password: {password.password}</h2>
                        <h2>Url: {password.url}</h2> */}
                        </Modal.Body>
                    </Form>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            <Modal
                    onHide={handleOpenNewPassword}
                    show={show}
                    id="newPassword-modal"
                >
                    
                    <Modal.Dialog>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <div id="newPasswordSpinner" className="hide"><Spinner id="" animation="border"  />;</div>
                            
                            <Modal.Title id="modalName">Create a new password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Page Name</Form.Label>
                                <Form.Control id="newPasswordName" name="name" type="text" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Email</Form.Label>
                                <Form.Control id="newPasswordEmail" name="email" type="email" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Username</Form.Label>
                                <Form.Control id="newPasswordUsername" name="username" type="text" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Password</Form.Label>
                                <Form.Control id="newPasswordPassword" name="password" type="password" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Website</Form.Label>
                                <Form.Control id="newPasswordUrl" name="url" type="url" onChange={handleChange}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleOpenNewPassword}>
                                Close
                            </Button>
                            <Button type="submit">Save Password</Button>
                        </Modal.Footer>
                    </Form>
                    </Modal.Dialog>
                </Modal>
            </div>
        </div>
        
    )
}
export default PasswordGallery