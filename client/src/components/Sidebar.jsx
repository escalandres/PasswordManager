import React, {useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { faUser, faArrowLeft, faChevronLeft ,faChevronRight, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { Button, ButtonToolbar, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter} from 'react-bootstrap';
import '../css/theme1.css';
import '../css/sidebar.css';
import AlertMessage from "./AlertMessage";
import { generate } from "../../functions/passwordGenerator";
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaKey
}from "react-icons/fa";
import {
    CgPassword
}from "react-icons/cg"; 
import {
    TbRefresh
}from "react-icons/tb"; 
import { NavLink } from 'react-router-dom';
// import { faGear } from 'react-bootstrap-icons';

const state = {
    text: '',
    type: ''
};




const Sidebar = ({children}) => {
    const navigate = useNavigate();

    const [range, setRange] = useState(16);
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const[show ,setShow] = useState(false);
    const openGenerator = () => setShow (!show);
    const [alert, setAlert] = useState(state) 
    const menuItem=[
        {
            path:"/dash",
            name:"Gallery",
            click:"",
            icon:<FaTh/>
        },
        {
            path:"/analytics",
            name:"Generator",
            click: openGenerator,
            icon:<CgPassword/>
        },
        {
            path:"/comment",
            name:"Comment",
            click:"",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"Product",
            click:"",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"List",
            click:"",
            icon:<FaThList/>
        },
        {
            path:"/about",
            name:"About",
            click:"",
            icon:<FaUserAlt/>
        },
    ]
    const handleChange = () =>{
        setRange(parseInt(document.getElementById("lengthRange").value))
    }
    const handleNavigate = (path) =>{
        navigate(path)
    }
    const handleGenerate = () => {
        let length = document.getElementById("lengthRange").value;
        let lowerIsChecked = document.getElementById("lowerCheck").checked;
        let upperIsChecked = document.getElementById("upperCheck").checked;
        let symbolIsChecked = document.getElementById("symbolsCheck").checked;
        let numberIsChecked = document.getElementById("numbersCheck").checked;
        if(lowerIsChecked===false&&upperIsChecked===false&&symbolIsChecked===false&&numberIsChecked===false){
            document.getElementById("generator__alert-container").classList.remove("hide")
            setAlert({text: "You must select at least one option", type: "danger"})
            // state.text = ;
            // state.type = "danger";
            setTimeout(() => {
                // load.classList.add("hide")
                document.getElementById("generator__alert-container").classList.add("hide")
            }, 4000);
            //alert('Debe selecciona alguna de las opciones!')
        }else{
        let pass = generate(length, lowerIsChecked, upperIsChecked, symbolIsChecked, numberIsChecked)
        document.getElementById("passwordInput").innerHTML = pass;
        console.log(pass)
    }

    }

    const copyNewPassword = () =>{
        let clipboard = document.getElementById('passwordInput');
        navigator.clipboard.writeText(clipboard.textContent);
        document.getElementById("generator__alert-container").classList.remove("hide")
            setAlert({text: "Password copied on clipboard!", type: "success"})
            // state.text = ;
            // state.type = "danger";
            setTimeout(() => {
                // load.classList.add("hide")
                document.getElementById("generator__alert-container").classList.add("hide")
            }, 4000);
    }
    return (
        <div className="sidebar-container">
            {/* <div className={isOpen ? "sidebar wrapper--wgYc0yYGn1" : "sidebar wrapper--wgYc0yYGn1 collapsed--BrviRkpKCo" }> */}
            <div style={{width: isOpen ? "270px" : "60px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Manager</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars className="logo-icon" onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <a key={index} className="link" onClick={item.click}>

                        {/* <a key={index} className="link" onClick={() => {handleNavigate(item.path)}}> */}
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text" >{item.name}</div>
                        </a>
                    ))
                }
            </div>
            {/* <main>{children}</main> */}
            {/* Modal */}
            <Modal
                    onHide={openGenerator}
                    show={show}
                    className="generatorModal"
                >
                    
                    <Modal.Dialog>
                        <Modal.Header className="modalHeader">
                            <div className="generatedPasswordContainer">
                                <div id="generator__alert-container" className="alert-container hide">
                                    <AlertMessage id="message" text={alert.text} type={alert.type} />            
                                </div>
                                <div className="passwordAndIndicator">
                                    <div className="passwordInputContainer">
                                        <div id="passwordInput" ></div>
                                        <Button id="refreshButton" variant="link" className="refresh-btn" onClick={handleGenerate}>
                                            <TbRefresh className="refresh-icon"/>

                                        </Button>

                                    </div>
                                </div>
                                <div className="passwordButtons">
                                    <Button id="copy-btn" variant="success" onClick={copyNewPassword}>
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="generatorSettings">
                                <div className="generatorOptions">
                                    <div className="lengthContainer">
                                    <label id="lengthRangeLabel">LENGTH ({range})</label>
                                        <input id="lengthRange" type="range" defaultValue="16" step="1" min="8" max="40" onChange={handleChange}/>
                                    </div>
                                    <div className="checkContainer">
                                        <input id="lowerCheck" type="checkbox" />
                                        <label className="checkLabel" >Lower Cases (e.g. ah)</label>
                                    </div>
                                    <div className="checkContainer">
                                        <input id="upperCheck" type="checkbox" />
                                        <label className="checkLabel" >Upper Cases (e.g. TG)</label>
                                    </div>
                                    <div className="checkContainer">
                                        <input id="symbolsCheck" type="checkbox" />
                                        <label className="checkLabel" >Symbols Cases (e.g. @%&?)</label>
                                    </div>
                                    <div className="checkContainer">
                                        <input id="numbersCheck" type="checkbox" />
                                        <label className="checkLabel" >Numbers Cases (e.g. 1298)</label>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    
                    </Modal.Dialog>
                </Modal>
        </div>
    );
};

export default Sidebar