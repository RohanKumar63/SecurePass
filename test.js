const CryptoJS = require('crypto-js');
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const decryptedPassword = CryptoJS.AES.decrypt("U2FsdGVkX1/AayTzl5M/9kdl7nkQCPLYKj2ivdh3Wf8=", SECRET_KEY);

var originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

console.log(originalPassword);


