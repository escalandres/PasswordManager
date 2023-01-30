const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uuid = require("uuid").v4;
const mongoose = require('mongoose');
const fs = require('fs');
const encryption = require('../functions/fileEncryption');
const File = require('../model/file');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE = process.env.DATABASE_URL;
const FILE_KEY = process.env.FILE_KEY;
mongoose.connect(DATABASE);

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
        await File.create(obj, (err, item) =>{
            if(err){ console.error(err); res.status(500).json({message: 'Error al crear el archivo de contraseñas'})}
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

const updateFile = async(req, res) => {
    try{
        const token = jwt.verify(req.body.token, JWT_SECRET);
        const data = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            url: req.body.url
        }
        let userId = token.userId
        let user = await File.findOne({userId}).exec();
        let userFile = user.file
        let decryptedFile = encryption.decrypt(userFile, token.password)
        let file2 = JSON.parse(decryptedFile);
        console.dir(file2)
        file2.push(data) 
        userFile = JSON.stringify(file2);
        let encryptedFile = encryption.encrypt(userFile, token.password)
        console.log('Archivo encriptado')
        await File.updateOne({userId},{$set: {"file": encryptedFile}})

        console.log('check')
        let show = await File.findOne({userId}).exec();
        let show2 = encryption.decrypt(show.file, token.password)
        let show3 = JSON.parse(show2)
        console.log(show3)
        // fs.writeFileSync(path, file, "utf-8")
        // console.log('Archivo '+userId+'.json creado!')

        // let fileToEncrypt = fs.readFileSync(path+extensions[0], "utf-8");
        // let encrypted = encryption.encrypt(fileToEncrypt, key)
        // fs.writeFileSync(path+extensions[1], encrypted, (err, file) =>{
        //     if(err) return console.error(err.message);
        //     if(file){
        //         console.log('File Encrypted successfully')
        //     }
        // })
        // fs.unlinkSync(path+extensions[0])
        // let fileToSote = fs.readFileSync(path+extensions[1], "utf-8");
        // const obj = {
        //     userId: userId,
        //     file : fileToSote
        // }
        // const response = await File.create(obj, (err, item) =>{
        //     if(err){ console.error(err);}
        //     else{ console.log('Archivo almacenado con exito!')}
        // })
        
        // res.send('ok')
    }
    catch(err) {
        // Falló la escritura
        console.log('error')
        console.log(err)
    }
}

const getFile = async(req, res) => {
    try{
        const token = jwt.verify(req.body.token, JWT_SECRET);
        let userId = token.userId
        let user = await File.findOne({userId}).exec();
        let userFile = user.file
        let decryptedFile = encryption.decrypt(userFile, token.password)
        let file2 = JSON.parse(decryptedFile);
        console.dir(file2)
 
        let encryptedPasswords = encryption.encrypt(file2, FILE_KEY)
        res.send({satus: 'OK', data: encryptedPasswords})
    }
    catch(err) {
        // Falló la escritura
        console.log('error')
        console.log(err)
        res.send({satus: 'NO', message: 'Error al leer el archivo'})
    }
}

module.exports = {createFile, updateFile, getFile}