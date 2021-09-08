const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

// entspricht den Apps
const ConsumerSchema = new mongoose.Schema({
    name: String, 
    apiKey: String,
    description: String, 
    permissions: [String]
})

// types
const PatientSchema = new mongoose.Schema({
    name: String, 
    age: String,
    sex: String
})

const DeviceSchema = new mongoose.Schema({
    name: String, 
    operatingsystem: String,
    owner: String
})

const PractitionerSchema = new mongoose.Schema({
    name: String, 
    profession: String,
    description: String
})

const ObservationSchema = new mongoose.Schema({
    patient: String, 
    practitioner: String,
    description: String
})


const User = connection.model('User', UserSchema);
const Consumer = connection.model('Consumer', ConsumerSchema);
const Patient = connection.model('Patient', PatientSchema);
const Device = connection.model('Device', DeviceSchema);
const Practitioner = connection.model('Practitioner', PractitionerSchema);
const Observation = connection.model('Observation', ObservationSchema);

// Expose the connection
module.exports = connection;
