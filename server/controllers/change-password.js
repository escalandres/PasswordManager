const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE = process.env.DATABASE_URL;

mongoose.connect(DATABASE);



const checkUser = async(req, res) =>{
    try{
        const {name, email} = req.body;
        const user = await User.findOne({email}).exec();
        if(user.sname === name && email === user.semail){
            res.json({message: "El usuario existe", status: "OK", data: email})
        }else{
            res.json({message: "El usuario no existe", status: "NO"})
        }
    }catch(error){
        res.json({message: "invalid token"})
    }
}

const newPassword = async(req, res) =>{
    try{
        const {email, password} = req.body;
        console.log(req.body)
        const newPassword = await bcrypt.hash(password, 10);
        //const user = await User.findOne({email}).exec();
        await User.updateOne({email},{$set: {"hashedPassword": newPassword}})
        //console.log(user)
        res.status(200).json({message: "Contraseña cambiada", status: "OK"})
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: error})
    }
}


module.exports = {checkUser, newPassword}