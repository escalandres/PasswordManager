const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('dotenv').config();

Mongoose.connect("mongodb://localhost/password_manager");
const UserModel = new Mongoose.model("user", {
    email: String,
    name: String,
    password: String
});



const signup = async(req, res) =>{
    try{
        const {sname, semail, spassword} = req.body;
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(spassword, 10);
        let token = jwt.sign({
            "userId": userId,
            "iat": 1614540008,
            "exp": 1614542008
        }, "secret", {noTimestamp:true});
        var user = new UserModel({userId, sname, semail, hashedPassword});
        var result = await user.save();
        console.log(result);
        res.status(200).json({token, userId, sname, semail, hashedPassword})
    }catch (error){
        console.log(error);
        res.status(500).json({message: error})
    }
}

const login = async(req, res) =>{
    try{
        const { lemail, lpassword} = req.body;
        var user = await UserModel.findOne({lemail}).exec();
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(lpassword, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        else{
            response.status(200).json({message: user});
        }
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: error})
    }
}


module.exports = {signup, login}