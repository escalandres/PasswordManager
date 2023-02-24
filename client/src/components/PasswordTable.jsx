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

// function decryptMessage(ciphertext){ value
//     var bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_FILE_KEY);
//     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     return decryptedData
// }
/***
 * !
 */
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
    text: '',
    type: ''
};

// function passData(passwordData, index){
//     data.name = passwordData.name;
//     data.email = passwordData.email;
//     data.username = passwordData.username;
//     data.password = passwordData.password;
//     data.url = passwordData.url;
//     data.index = index;
// }

const PasswordTable = () => {
    const [passwords, setPasswords] = useState(initialPass);
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(state) 

    const [show, setShow] = useState(false);
    const [upData, setUpData] = useState(data);
    const [index, setIndex] = useState(0);
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
                console.log('passwords')
                console.log(decryptedData)
                pass = decryptedData;
                setPasswords(decryptedData); 
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
    const passData = (passwordData, indice)=>{
        setUpData(passwordData)
        setIndex(indice);
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
        setUpData({ ...upData, [e.target.name]: e.target.value })
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            document.getElementById("newPasswordSpinner").classList.remove("hide")
            const { name, email, username, password, url} = upData;
            const URL = import.meta.env.VITE_SERVER+'/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            console.log('name:'+name)
            console.log('email:'+email)

            console.log('username:'+username)
            console.log('password:'+password)
            console.log('url:'+url)
            
            const answer = await axios.post(`${URL}`, {
                name, user, email, username, password, url, index
            });
            console.log(answer)
                document.getElementById("newPasswordSpinner").classList.add("hide")
                toggle()
            if(answer.data.status === "OK"){
                setAlert({text: "Modified password saved successfully!", type: "success"})
                document.getElementById("modified__alert-container").classList.remove("hide")
                console.log('si')
            }
            else{
                setAlert({text: "Error on saving password!", type: "danger"})
                document.getElementById("modified__alert-container").classList.remove("hide")

            }

            setTimeout(() => {
                // load.classList.add("hide")
                document.getElementById("modified__alert-container").classList.add("hide")
                window.location.reload();
            }, 4000);
            //window.location.reload();
        //}
    }

    return(
        <div className="password-table" id="">
            <div id="modified__alert-container" className="alert-container hide">
                <AlertMessage id="message" text={alert.text} type={alert.type} />            
            </div>
            
            {/* <Button onClick={handleOpenNewPassword} variant="success">Create new Password</Button> */}

            <div className="table-container">
                <table className="">
                    <thead>
                        <tr id="password-table__head">
                            <td>ITEM NAME</td>
                            <td>LAST USED</td>
                            <td>CATEGORY</td>
                        </tr>
                    </thead>
                    <tbody>
                    {pass.map((password, index) =>{
                        if(JSON.stringify(password) !== JSON.stringify({name:'',email:'',username:'',password:'',url:''})){
                        return(
                            
                                <tr className="password-container" id={index} key={index} onClick={() => {toggle();passData(pass[index],index)}}>
                                    <td style={{paddingLeft: 50}}>
                                        <div onSubmit={handleSubmit}>
                                            <p className="text-muted"><strong>{password.name}</strong></p>
                                            <em className="">{password.email}</em>
                                        </div>
                                    </td>
                                    <td style={{textAlign: "center"}}>Yesterday</td>
                                    <td style={{textAlign: "center"}}>Social Page</td>
                                </tr>
                            
                            
                        );
                        }
                    })

                    }
                    </tbody>
                </table>
            </div>            

            <div>
            <Modal
                    onHide={toggle}
                    show={modal}
                >
                    
                    <Modal.Dialog>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                        <div id="newPasswordSpinner" className="hide"><Spinner id="" animation="border"  />;</div>

                        <Modal.Title id="modalName">{upData.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form.Group className="form-group">
                            <Form.Label className="label" >Email</Form.Label>
                            <Form.Control id="modalEmail" name="email" type="email" value={upData.email} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control id="modalUsername" name="username" type="text" value={upData.username} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control id="modalPassword" name="password" type="password" value={upData.password} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="label">Website</Form.Label>
                            <Form.Control id="modalUrl" name="url" type="url" value={upData.url} onChange={handleChange}/>
                        </Form.Group>
                            <input id="modalIndex" className="hide" name="index" type="number" value={index} disabled/>
                        </Modal.Body>
                        <div className="btn-container my-3">
                            <Button variant="secondary mx-2" onClick={toggle}>Close</Button>
                            <Button type="submit" variant="success mx-2">Save Password</Button>
                            <Button variant="danger mx-2 ">Delete Password</Button>
                        </div>
                        
                    </Form>
                    
                    <Modal.Footer>
                    
                    </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            
            </div>
        </div>
        
    )
}
export default PasswordTable