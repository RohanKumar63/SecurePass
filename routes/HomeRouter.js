const express = require('express');
const router = express.Router();
const{registerUser , loginUser, logout} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require('../models/user-model');
// Define your routes
router.get('/', (req, res) => {
        let error = req.flash("error");
    const token = req.cookies.token || req.headers['authorization'];
    res.render('home', {isAuthenticated: !!token, error});
});
router.get("/user", isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({ email: req.user.email }).populate("datas");
    res.render('index' , {user});
})







// Export the router
module.exports = router;
