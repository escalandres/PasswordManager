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
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { decryptMessage, encryptMessage } from "../../functions/encryption";
import About from '../pages/About.jsx';
import Analytics from '../pages/Analytics.jsx';
import Comment from '../pages/Comment.jsx';
import Product from '../pages/Product.jsx';
import ProductList from '../pages/ProductList.jsx';
import {
    AiOutlinePlus,
}from "react-icons/ai";
import {
    FaShare, FaHistory
}from "react-icons/fa";
import '../css/dashboard.css'


const Dashboard = () =>{
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    return(
        <div className="dashboard-container">
            <div className="rows" style={{margin: 0}}>
                <Sidebar/>
                <div className="right-container">
                    <div className=" navbar-row" style={{margin: 0}}>
                        <Navbar  bg="light" expand="lg" >
                        <div className="navbar-container">
                            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Button variant="success" className="add-btn nav-btn"><AiOutlinePlus className="nav-icon"/> Add new</Button>
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
            
            
        </div>
    )
}

export default Dashboard