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
import {Button, Form, Alert, Modal, Spinner, Row, Col, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import AlertMessage from "./AlertMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import { decryptMessage, encryptMessage } from "../../functions/encryption";
import About from '../pages/About.jsx';
import Analytics from '../pages/Analytics.jsx';
import Comment from '../pages/Comment.jsx';
import Product from '../pages/Product.jsx';
import ProductList from '../pages/ProductList.jsx';
import '../css/dashboard.css'


const Dashboard = () =>{
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    return(
        <div className="dashboard-container">
            <Row className="show-grid" style={{margin: 0}}>
                <Col lg={2} xl={2} md={2} sm={3} xs={3} style={{padding: 0}}>
                    <Sidebar>
                        {/* <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/comment" element={<Comment />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/productList" element={<ProductList />} />
                        </Routes> */}
                    </Sidebar>
                </Col>
                <Col lg={10} xl={10} md={8} sm={9} xs={10} style={{padding: 0, marginLeft: 0.6}}>
                    <Row className="show-grid" style={{margin: 0}}>
                        <Navbar  bg="light" expand="lg" >
                        <div className="navbar-container">
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            </Navbar.Collapse>
                        </div>
                        </Navbar>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Row>
            
            
        </div>
    )
}

export default Dashboard