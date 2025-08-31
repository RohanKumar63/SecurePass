const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const{registerUser , loginUser, logout} = require("../controllers/authController")
const userModel = require('../models/user-model');
const dataModel = require('../models/data-model');
const isLoggedIn = require("../middlewares/isLoggedIn");
const CryptoJS = require('crypto-js');
const SECRET_KEY = process.env.SECRET_KEY;

require("dotenv").config();

router.get("/login", (req,res)=>{
    let error = req.flash('error');
    res.render('login',{error});
})

router.get('/signup', (req, res) => {
    const token = req.cookies.token || req.headers['authorization'];
    res.render('signup',{isAuthenticated: !!token });
});

// router.get("/edit/:id", isLoggedIn , async (req, res) => {
//     let data = await dataModel.findOne({ _id: req.params.id }).populate("user")
//     res.render("EditPage", { data })
// }); 

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  try {
    let data = await dataModel.findOne({ _id: req.params.id }).populate("user");

    if (!data) return res.status(404).send("Data not found");

    // 🔑 Decrypt password
    let decryptedPassword = "";
    try {
      decryptedPassword = CryptoJS.AES.decrypt(data.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error("Decryption failed:", err);
    }

    // Replace encrypted with decrypted for EJS
    data.password = decryptedPassword;

    res.render("EditPage", { data });
  } catch (err) {
    console.error("Error loading edit page:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/delete/:id" , isLoggedIn , async (req, res) =>{
    let data = await dataModel.findOne({ _id: req.params.id })
    res.render("delete", { data })
   

} );

router.get("/logout", logout);

router.post("/register", registerUser );

router.post("/login", loginUser);


// router.post("/data", isLoggedIn,  async (req,res)=>{

//     let user = await userModel.findOne({ email: req.user.email }).populate("datas")
//     console.log('User:', req.user);
//     let {  url, username, password} = req.body;

//     let data = await dataModel.create({
//         user: user._id,
//         url,
//       username,
//       password, 

//     })
//     user.datas.push(data._id);
//     await user.save();
//     res.redirect('/user');

// });


router.post("/data", isLoggedIn, async (req, res) => {
    try {
        const { url, username, password } = req.body;

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        // Save to the database
        let user = await userModel.findOne({ email: req.user.email }).populate("datas");
        const data = await dataModel.create({
            user: user._id,
            url,
            username,
            password: encryptedPassword, // Store encrypted password
        });

        user.datas.push(data._id);
        await user.save();

        res.redirect("/user");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Internal Server Error");
    }
});


// router.post("/update/:id", isLoggedIn , async (req, res) => {
    
//     let data = await dataModel.findOneAndUpdate({ _id: req.params.id }, { url: req.body.url , username: req.body.username , password: req.body.password });
//     res.redirect("/user");
// });


// Update Data (Encrypt password)
router.post("/update/:id", isLoggedIn, async (req, res) => {
  try {
    const { url, username, password } = req.body;

    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

    await dataModel.findOneAndUpdate(
      { _id: req.params.id },
      { url, username, password: encryptedPassword },
      { new: true }
    );

    res.redirect("/user");
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/delete/:id", isLoggedIn , async (req, res) => {
let data = await dataModel.findOneAndDelete({ _id: req.params.id }, { url: req.body.url , username: req.body.username , password: req.body.password });
res.redirect('/user');
});



// Export the router
module.exports = router;
