const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uuid = require("uuid").v4;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const encryption = require('./fileEncryption');
const File = reqire('../model/file');
mongoose.connect(DATABASE);

require('dotenv').config();

const createFile = async(userId, key) => {
    const path = __dirname+'/files/'+userId;
    const extensions = ['.json','.pmf'];
    const data = [{
        email: '',
        username: '',
        password: '',
        url: ''
    }];
    try{
        fs.writeFileSync(path+extensions[0], data, "utf-8")
        console.log('Archivo '+userId+'.json creado!')
        //Proceso para encriptar el archivo
        let fileToEncrypt = fs.readFileSync(path+extensions[0], "utf-8");
        let encrypted = encryption.encrypt(fileToEncrypt, key)
        fs.writeFileSync(path+extensions[1], encrypted, (err, file) =>{
            if(err) return console.error(err.message);
            if(file){
                console.log('File Encrypted successfully')
            }
        })
        //Se borra el archivo .json
        fs.unlinkSync(path+extensions[0])
        let fileToSote = fs.readFileSync(path+extensions[1], "utf-8");
        const obj = {
            userId: userId,
            file : fileToSote
        }
        //Se almacena el archivo en la base de datos
        const response = await File.create(obj, (err, item) =>{
            if(err){ console.error(err);}
            else{ console.log('Archivo almacenado con exito!')}
        })

        res.send('ok')
    }
    catch(err) {
        // Falló la escritura
        console.log('error')
        console.log(err)
    }
}

const savePassword = async(userId, key) => {
    const path = __dirname+'/files/'+userId;
    const extensions = ['.json','.pmf'];
    const data = [{
        email: '',
        username: '',
        password: '',
        url: ''
    }];
    try{
        let file = fs.readFileSync(path+extensions[0], "utf-8");
        let file2 = JSON.parse(file);
        file2.push(data) 
        file = JSON.stringify(file2);
        fs.writeFileSync(path, file, "utf-8")
        console.log('Archivo '+userId+'.json creado!')

        let fileToEncrypt = fs.readFileSync(path+extensions[0], "utf-8");
        let encrypted = encryption.encrypt(fileToEncrypt, key)
        fs.writeFileSync(path+extensions[1], encrypted, (err, file) =>{
            if(err) return console.error(err.message);
            if(file){
                console.log('File Encrypted successfully')
            }
        })
        fs.unlinkSync(path+extensions[0])
        let fileToSote = fs.readFileSync(path+extensions[1], "utf-8");
        const obj = {
            userId: userId,
            file : fileToSote
        }
        const response = await File.create(obj, (err, item) =>{
            if(err){ console.error(err);}
            else{ console.log('Archivo almacenado con exito!')}
        })
        
        res.send('ok')
    }
    catch(err) {
        // Falló la escritura
        console.log('error')
        console.log(err)
    }
}

module.exports = {createFile}