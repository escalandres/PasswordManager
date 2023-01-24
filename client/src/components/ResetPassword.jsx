import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faGooglePlusG, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

const cookies = new Cookies();

const initialState = {
    name: '',
    email: '',
    password: ''
}

const ResetPassword = () => {
    const [form, setForm] = useState(initialState);
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            const { name, email, password} = form;
            const URL = 'http://localhost:5200/change-password';
            if(!isChecked){
                const answer = await axios.post(`${URL}`, {
                    name, email
                });
                console.dir(answer.data.data)
                alert(answer)
                if(answer.data.status === "OK"){
                    setIsChecked(true);
                }
            }
            else{
                const result = await axios.post(`${URL}`, {
                    email, password
                });
                console.dir(result.data.data)
                
                if(result.data.status === "OK" && result.data.message === "Contraseña cambiada"){
                    setIsChecked(false);
                    alert("Su contraseña ha sido cambiada!")
                }
            }
            //window.location.reload();
        //}
    }


    return(
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#" onSubmit={handleSubmit}>
                    <h1 className="h1-black">Recupere su cuenta</h1>
                    <div className="input-container">
                        <label>Correo electrónico</label>
                        <input type="email" placeholder="Email" name="email"
                            onChange={handleChange}/>
                    </div>
                    <div className="input-container">
                        <label>Correo electrónico</label>
                        <input type="text" placeholder="Name" name="name"
                            onChange={handleChange}/>
                    </div>
                    <button type="submit">Recuperar Contraseña</button>

                    {isChecked &&(
                        <div className="input-container">
                            <label>Correo electrónico</label>
                            <input type="password" placeholder="New Password" name="password"
                                onChange={handleChange}/>
                            <button type="submit">Recuperar Contraseña2</button>

                        </div>
                    )}
                </form>
            </div>
            
        </div>
        
    )
}
export default ResetPassword