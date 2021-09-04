const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

const User = connection.models.User;
const Consumer = connection.models.Consumer; 
/**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

 router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });

 router.post('/initData',(req,res, next) => {
    console.log("post@initData");
    const newConsumer = new Consumer({
        name: "a", 
        apiKey: "as",
        description: "asd"
    });

    newConsumer.save()
        .then((user) => {
            res.json({answer: 42});
            console.log(user);
        });


    res.redirect('/');
 })




 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

// +++ initData +++
router.get('/initData',(req, res, next) => {

    console.log("get@InitData")

    const form = '<h1>initData</h1><form method="post" action="initData">\
    xxx:<br><input type="text" name="xxx">\
    <br>xxx:<br><input type="text" name="xxx">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form); 
})

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a> <a href="/initData">Go to initData</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});




module.exports = router;