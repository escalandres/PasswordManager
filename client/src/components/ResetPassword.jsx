import React, { Component, useEffect, useState, useRef } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/login.css';
import '../App.css';
import '../index.css';
// const cookies = new Cookies();

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
        const semail = ''
        e.preventDefault();
            const { name, email, password} = form;
            const URL = 'http://localhost:5200/change-password';
            //console.log(URL)
            if(!isChecked){
                const answer = await axios.post(`${URL}/check-user`, {
                    name, email
                });
                // semail = answer.data.data;
                console.dir(answer.data.data)
                if(answer.data.status === "OK"){
                    setIsChecked(true);
                }
            }
            else{
                console.log(email)
                console.log(password)
                const result = await axios.post(`${URL}/change-password1`, {
                    email, password
                });
                console.dir(result.data.data)
                
                if(result.data.status === "OK" && result.data.message === "Contraseña cambiada"){
                    setIsChecked(false);
                    alert("Su contraseña ha sido cambiada!")
                }
            }
            window.location.reload();
        //}
    }


    return(
        <div className="container" id="container">
            <div className="form-container log-in-container">
                <form action="#" onSubmit={handleSubmit}>
                    <h1 className="h1-black">Recupere su cuenta</h1>
                    <div className="form__section">
                        <div className="input-container">
                            <label>Correo electrónico</label>
                            <input type="email" placeholder="Email" name="email"
                                onChange={handleChange}/>
                        </div>
                        {!isChecked &&(
                            <div className="input-container">
                                <label>Nombre</label>
                                <input type="text" placeholder="Name" name="name"
                                    onChange={handleChange}/>
                            </div>
                        )}
                        {isChecked &&(
                            <div className="input-container">
                                <label>New Password</label>
                                <input type="password" placeholder="New Password" name="password"
                                    onChange={handleChange}/>
                            </div>
                        )}
                    </div>
                    
                    <button className="reset-btn" type="submit">Recuperar Contraseña</button>

                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, There!</h1>
                        <div className="reset-text__container">
                            <p>
                                <span className="reset-span">¿No tienes una cuenta?</span>
                                <a href="/" className="reset-a">Registrate</a>
                            </p>
                            <p>
                                <span className="reset-span">También puedes</span>
                                <a href="/" className="reset-a">Iniciar sesión</a>
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default ResetPassword