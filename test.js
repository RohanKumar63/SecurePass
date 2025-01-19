// const CryptoJS = require('crypto-js');
// require("dotenv").config();
// const SECRET_KEY = process.env.SECRET_KEY;

// const { name } = require("ejs");

// const decryptedPassword = CryptoJS.AES.decrypt("U2FsdGVkX1/AayTzl5M/9kdl7nkQCPLYKj2ivdh3Wf8=", SECRET_KEY);

// var originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

// console.log(originalPassword);
const { compareSync } = require('bcrypt');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})
// let a = [41, 32, 10, 8, 7, 5, 3, 2, 1];

// a.splice(4,5);
// console.log(a);

// var a = {
//     name: "RK",
//     age: 20,
//     k : function () {
//     console.log("this is methode");
//     }
// }

// a.k();

// if (true) {
//     var b = 20; // Accessible outside the block
//   }
//   console.log(b);
 
var a = [1 ,2 ,5,4];
// var b = [...a]

a.forEach(function(val){
    console.log(val);
})

// console.log(b);

setTimeout(function(){
    console.log("hello");
}
,2000);













app.listen(8000, () => {
})