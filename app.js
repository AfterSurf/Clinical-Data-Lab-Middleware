const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */


require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);



/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3003);