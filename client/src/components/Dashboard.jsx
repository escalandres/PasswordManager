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
import {Button, Form, Alert, Modal, Spinner, Row, Col, Container} from 'react-bootstrap';
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

    return(
        <Container className="dashboard-container">
                <Row className="show-grid">
                    <Col lg={12} xl={12} md={6}>
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
                </Row>
            
            
        </Container>
    )
}

export default Dashboard