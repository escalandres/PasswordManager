const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/user');
const file = require('./fileManager')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE = process.env.DATABASE_URL;

mongoose.connect(DATABASE);



const signup = async(req, res) =>{
    try{
        console.log(req.body)
        const {sname, semail, spassword} = req.body;
        const {name = sname, email = semail} = {sname, semail};
        console.log(name)
        console.log(email)
        //const newuser = new newUser(req.body.sname, req.body.semail, req.body.spassword)
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(spassword, 10);
        const token = jwt.sign({id: userId, email: semail,
            name: sname, password: spassword
        }, JWT_SECRET )
        //var user = new UserModel({userId, sname, semail, hashedPassword});
        const response = await User.create({
            userId, email, name, hashedPassword
        })
        console.log(response)
        let result = file.createFile(userId, spassword)
        // res.status(200).json({token, userId, sname, semail, hashedPassword})
        console.log(result)
        res.status(200).json({message: "Usuario registrado", status: 'ok', data: {token: token, email: email, name: name}})

    }catch (error){
        console.log(error);
        res.status(500).json({message: error})
    }
}

const login = async(req, res) =>{
    try{
        const { lemail, lpassword} = req.body;
        console.log(req.body)
        console.log(lemail)
        const user = await User.findOne({email: lemail}).exec();
        console.log(user)
        if(!user) {
            return res.send({ message: "The user does not exist", status: "error" });
        }
        if(!bcrypt.compareSync(lpassword, user.hashedPassword)) {
            return res.send({ message: "The password is invalid" });
        }
        else{
            
            const token = jwt.sign({id: user.userId, email: user.email,
                name: user.name, password: lpassword
            }, JWT_SECRET )
            console.log(token)
            res.status(200).json({message: "Usuario logueado", status: 'ok', data: {token: token, email: user.email, name: user.name}});
        }
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: error})
    }
}


module.exports = {signup, login}