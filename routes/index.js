const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

const User = connection.models.User;
const Consumer = connection.models.Consumer; 
const Patient = connection.models.Patient; 
const Device = connection.models.Device; 
const Practitioner = connection.models.Practitioner; 
const Observation = connection.models.Observation; 
/**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

router.post('/putConsumer', ((req, res, next) => {
    console.log(req.body);
    const aConsumer = new Consumer({
        name: req.body.name, 
        apiKey: "123",
        description: req.body.description,
        permissions: ["device", "patient"]
        // permissions:  req.body.permissions
    });
    aConsumer.save().catch(err => console.log(err)).then((user) => {
        console.log("erstellt.")
    });
    
}));

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
    console.log("post@initData","bar");

    const newConsumer = new Consumer({
        name: "a", 
        apiKey: "as",
        description: "asd",
        permissions: ["device", "patient"]
    });

    const newPatient = new Patient({
        name: "A", 
        age: "5",
        sex: "m"
    });
    const newPatient2 = new Patient({
        name: "B", 
        age: "3",
        sex: "f"
    });
    const newPatient3 = new Patient({
        name: "C", 
        age: "18",
        sex: "m"
    });

    const newDevice = new Device({
        name: "Device1", 
        operatingsystem: "Ubuntu",
        owner: "ALi"
    });
    const newDevice2 = new Device({
        name: "Device1", 
        operatingsystem: "Windows10",
        owner: "Tim"
    });
    const newDevice3 = new Device({
        name: "Device2", 
        operatingsystem: "MacOS",
        owner: "Susi"
    });

    const newPractitioner = new Practitioner({
        name: "Practitioner1", 
        profession: "Arzt",
        description: "Allg. medizin"
    });

    const newPractitioner2 = new Practitioner({
        name: "Practitioner2", 
        profession: "Programmierer",
        description: "Ein Coder"
    });

    const newPractitioner3 = new Practitioner({
        name: "Practitioner3", 
        profession: "Lehrer",
        description: "Straigth teacher"
    });

    newPatient.save().then((user) => {
        console.log("erstellt.")
    });
    newPatient2.save().then((user) => {
        console.log("erstellt.")
    });
    newPatient3.save().then((user) => {
        console.log("erstellt.")
    });

    newDevice.save().then((user) => {
        console.log("erstellt.")
    });
    newDevice2.save().then((user) => {
        console.log("erstellt.")
    });
    newDevice3.save().then((user) => {
        console.log("erstellt.")
    });

    newPractitioner.save().then((user) => {
        console.log("erstellt.")
    });
    newPractitioner2.save().then((user) => {
        console.log("erstellt.")
    });
    newPractitioner3.save().then((user) => {
        console.log("erstellt.")
    });

    newConsumer.save().then((user) => {
            console.log(user);})
            
            .then(() => {
            
            response = {  
                first_name:"test",  
                last_name:"test"  
            };  
            console.log(response);  
            res.json(response)  
            res.send(200);
        });
 
 })

 router.post('/initObservation',(req,res, next) => {
    const newObservation = new Observation({
        patient: "MR. A", 
        practitioner: "Doc A",
        description: "high fever"
    });

    const newObservation2 = new Observation({
        patient: "MS. B", 
        practitioner: "Doc B",
        description: "adiposity"
    });

    const newObservation3 = new Observation({
        patient: "MR. C", 
        practitioner: "Doc B",
        description: "fracture"
    });

    newObservation.save().then((user) => {
        console.log("erstellt.")
    });
    newObservation2.save().then((user) => {
        console.log("erstellt.")
    });
    newObservation3.save().then((user) => {
        console.log("erstellt.")
    });
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
    response = {  
        first_name:"init",  
        last_name:"init"  
    };  
    console.log(response);  
    res.json(response)  
})

// get Apps And Types 
router.get('/getPatient',async (req,res,next) => {
    const Patients = await Patient.find().catch(err => console.log(err));
    res.json(Patients);
})
router.get('/getPractitioner',async (req,res,next) => {
    const Practitioners = await Practitioner.find().catch(err => console.log(err));
    res.json(Practitioners);
})
// router.get('/getObservation',async (req,res,next) => {
//     const Patients = await Patient.find().catch(err => console.log(err));
//     res.json(Patients);
// })
router.get('/getDevice',async (req,res,next) => {
    const Devices = await Device.find().catch(err => console.log(err));
    res.json(Devices);
})

router.get('/getConsumer',async (req,res,next) => {
    const Consumers = await Consumer.find().catch(err => console.log(err));
    res.json(Consumers);
})

router.get('/getObservation',async (req,res,next) => {
    const Consumers = await Observation.find().catch(err => console.log(err));
    res.json(Consumers);
})


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