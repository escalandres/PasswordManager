import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/login.css';
import '../css/password.css';
import CryptoJS from "crypto-js";
import {Button, Form, Alert, Modal, Spinner, Row, Col, Container, Nav, Navbar, NavDropdown, ButtonGroup} from 'react-bootstrap';
import AlertMessage from "./AlertMessage";
import PasswordTable from './PasswordTable';
import AddPasswordModal from "./AddPasswordModal";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { decryptMessage, encryptMessage } from "../../functions/encryption";

import {
    AiOutlinePlus,
}from "react-icons/ai";
import {
    FaShare, FaHistory
}from "react-icons/fa";
import '../css/dashboard.css'
const cookies = new Cookies();
const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    url: '',
}

const state = {
    text: '',
    type: ''
};

const Dashboard = () =>{
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [form, setForm] = useState(initialState);
    // const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
            document.getElementById("newPasswordSpinner").classList.remove("hide")
            const { name, email, username, password, url} = form;
            const URL = import.meta.env.VITE_SERVER+'/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            const answer = await axios.post(`${URL}`, {
                name, user, email, username, password, url
            });
            console.log('answer')
            console.log(answer)
            if(answer.data.status === "OK"){
                document.getElementById("newPasswordSpinner").classList.add("hide")
                toggle()
                // this.setState({modal: !this.state.modal});
                state.text = "New password saved successfully!";
                state.type = "success";
                // document.getElementById("alert-message").setAttribute("text", "New password saved successfully!")
                // document.getElementById("alert-message").setAttribute("type", "success")
                document.getElementById("alert-container").classList.remove("hide")
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
        <div className="dashboard-container">
        
            <div className="rows" style={{margin: 0}}>
                <Sidebar/>
                <div className="right-container">
                    <div id="alert-container" className="alert-container hide">
                        <AlertMessage id="message" text={state.text} type={state.type} />            
                    </div>
                    <div className=" navbar-row" style={{margin: 0}}>
                        <Navbar expand="lg" >
                        <div className="navbar-container">
                            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Button variant="success" className="add-btn nav-btn" onClick={toggle}><AiOutlinePlus className="nav-icon"/> Add new</Button>
                                <Button variant="secondary" className="second-btn nav-btn"><FaShare className="nav-icon"/> Share</Button>
                                <Button variant="secondary" className="second-btn nav-btn"><FaHistory className="nav-icon"/> View history</Button>
                            </Nav>
                            </Navbar.Collapse>
                        </div>
                        </Navbar>
                    </div>
                    <div className="right-container__body">
                        <PasswordTable/>
                    </div>
                </div>
            </div>
            {/**Modal section */}
            <Modal
                    onHide={toggle}
                    show={isOpen}
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
                            <Button variant="secondary" onClick={toggle}>
                                Close
                            </Button>
                            <Button type="submit">Save Password</Button>
                        </Modal.Footer>
                    </Form>
                    </Modal.Dialog>
                </Modal>
        </div>
    )
}

export default Dashboard