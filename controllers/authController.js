const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt');
const userModel = require("../models/user-model");
const {generateToken} = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {

    try {

        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email })

        if (user) {
            req.flash('error', 'you have already have an account');
                return res.redirect('/'); 
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect('/user/login')

                }
            });
        })
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.loginUser = async (req, res) => {

    try {

        let { email, password} = req.body;
        let user = await userModel.findOne({email:email});

        if(!user) {
            req.flash("error", "Check Email or Passward");
            return res.redirect('/user/login');
        }
       
       bcrypt.compare(password, user.password, (err ,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect('/user'); 

        }
        else{
            req.flash('error', 'Check email or password again');
                return res.redirect('/user/login'); 
        }

       })

      
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.logout = (req, res)=>{
    res.cookie("token", "");
    res.redirect('/');
}