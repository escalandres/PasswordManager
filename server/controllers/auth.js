const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/user');

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
        let token = jwt.sign({
            "userId": userId,
            "iat": 1614540008,
            "exp": 1614542008
        }, "secret", {noTimestamp:true});
        //var user = new UserModel({userId, sname, semail, hashedPassword});
        const response = await User.create({
            userId, email, name, hashedPassword
        })
        console.log(response)
        // res.status(200).json({token, userId, sname, semail, hashedPassword})
        res.status(200).json({message: "Usuario registrado"})

    }catch (error){
        console.log(error);
        res.status(500).json({message: error})
    }
}

const login = async(req, res) =>{
    try{
        const { lemail, lpassword} = req.body;
        // console.log(req.body)
        const user = await User.findOne({lemail}).exec();
        // console.log(user)
        if(!user) {
            return res.status(404).send({ message: "The user does not exist" });
        }
        if(!bcrypt.compareSync(lpassword, user.hashedPassword)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        else{
            
            const token = jwt.sign({id: user.userId, email: user.semail,
                name: user.sname, password: user.hashedPassword
            }, JWT_SECRET )
            console.log(token)
            res.status(200).json({message: "Usuario logueado", status: 'ok', data: token});
        }
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: error})
    }
}


module.exports = {signup, login}