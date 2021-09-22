const router = require('express').Router();
const connection = require('../config/database');

const Consumer = connection.models.Consumer; 
const Patient = connection.models.Patient; 
const Device = connection.models.Device; 
const Practitioner = connection.models.Practitioner; 
const Observation = connection.models.Observation; 
/**
 * -------------- POST ROUTES ----------------
 */

router.post('/putConsumer', ((req, res, next) => {
    console.log(req.body);
    const aConsumer = new Consumer({
        name: req.body.name, 
        apiKey: "123",
        permissions: req.body.permissions
    });
    aConsumer.save().catch(err => console.log(err)).then((user) => {
        console.log("erstellt.")
    });
    
}));



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



// get Apps And Types 
router.get('/getPatient',async (req,res,next) => {
    const Patients = await Patient.find().catch(err => console.log(err));
    res.json(Patients);
})
router.get('/getPractitioner',async (req,res,next) => {
    const Practitioners = await Practitioner.find().catch(err => console.log(err));
    res.json(Practitioners);
})

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


 /**
 * -------------- DELETE ROUTES ----------------
 */

  router.post('/deleteConsumer', ((req, res, next) => {
    console.log(req.body);
    Consumer.findByIdAndDelete(req.body.id, function (err) {
    if(err) console.log(err);
        console.log("Consumer mit id " + req.body.id + " gelöscht");
    });
  }));



  /**
 * -------------- EDIT ROUTES ----------------
 */

// https://masteringjs.io/tutorials/mongoose/update

router.post('/updateConsumer', ((req, res, next) => {
    update = {
            name: req.body.name, 
            permissions: req.body.permissions
        };
    Consumer.findByIdAndUpdate(req.body.id, update,
        function (err, docs) {
        if (err){
          console.log(err)
        } else {
            console.log("Updated Consumer : ", docs);
        }});
}));

module.exports = router;