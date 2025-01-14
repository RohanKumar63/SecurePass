const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

const db = require("./config/mongoose-connection");
require("dotenv").config();

const morgen = require('morgan');
app.use(morgen('dev'));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  expressSession({
      resave: false,
      saveUninitialized: true,
      secret: process.env.JWT_KEY, // Ensure this key is secure
      store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
      },
  })
);
app.use(flash());

// Route
const HomeRouter = require("./routes/HomeRouter");
const UserRouter = require("./routes/UserRouter");

app.use("/", HomeRouter);
app.use("/User", UserRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});