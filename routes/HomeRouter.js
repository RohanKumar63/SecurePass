const express = require('express');
const router = express.Router();
const{registerUser , loginUser, logout} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require('../models/user-model');
const SECRET_KEY = process.env.SECRET_KEY;
const CryptoJS = require('crypto-js');






// Define your routes
router.get('/', (req, res) => {
        let error = req.flash("error");
    const token = req.cookies.token || req.headers['authorization'];
    res.render('home', {isAuthenticated: !!token, error});
});




// router.get("/user", isLoggedIn, async (req,res)=>{
//     let user = await userModel.findOne({ email: req.user.email }).populate("datas");
//     res.render('index' , {user});
// })


router.get("/user", isLoggedIn, async (req, res) => {
    try {
        // Fetch user and populate 'datas' field
        let user = await userModel.findOne({ email: req.user.email }).populate("datas");

        // Decrypt passwords for each data object in 'datas'
        const decryptedData = user.datas.map(data => {
            const decryptedPassword = CryptoJS.AES.decrypt(data.password, process.env.SECRET_KEY ).toString(CryptoJS.enc.Utf8);

            return {
                url: data.url,
                username: data.username,
                password: decryptedPassword,
            };
        });
        res.render("index", { user, decryptedData });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});








// Export the router
module.exports = router;
