const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const{registerUser , loginUser, logout} = require("../controllers/authController")
const userModel = require('../models/user-model');
const dataModel = require('../models/data-model');
const isLoggedIn = require("../middlewares/isLoggedIn");


router.get("/login", (req,res)=>{
    let error = req.flash('error');
    res.render('login',{error});
})

router.get('/signup', (req, res) => {
    const token = req.cookies.token || req.headers['authorization'];
    res.render('signup',{isAuthenticated: !!token });
});

router.get("/edit/:id", isLoggedIn , async (req, res) => {
    let data = await dataModel.findOne({ _id: req.params.id }).populate("user")
    res.render("EditPage", { data })
}); 

router.get("/delete/:id" , isLoggedIn , async (req, res) =>{
    let data = await dataModel.findOne({ _id: req.params.id })
    res.render("delete", { data })
   

} );



router.get("/logout", logout);


router.post("/register", registerUser );

router.post("/login", loginUser);


router.post("/data", isLoggedIn,  async (req,res)=>{

    let user = await userModel.findOne({ email: req.user.email }).populate("datas")
    console.log('User:', req.user);
    let {  url, username, password} = req.body;

    let data = await dataModel.create({
        user: user._id,
        url,
      username,
      password, 

    })
    user.datas.push(data._id);
    await user.save();
    res.redirect('/user');

});

router.post("/update/:id", isLoggedIn , async (req, res) => {
    let data = await dataModel.findOneAndUpdate({ _id: req.params.id }, { url: req.body.url , username: req.body.username , password: req.body.password });
    res.redirect("/user");
});

router.post("/delete/:id", isLoggedIn , async (req, res) => {
let data = await dataModel.findOneAndDelete({ _id: req.params.id }, { url: req.body.url , username: req.body.username , password: req.body.password });
res.redirect('/user');
});



// Export the router
module.exports = router;
