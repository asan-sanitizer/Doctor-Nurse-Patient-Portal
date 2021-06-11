const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// properties
const JWT_SECRET = "MY_SECRET";
const USER_TYPES = ['nurse', 'patient'];

const patientSchema = mongoose.Schema({
    // email set to unique as we'll use it for the login credentials
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
    // the hash and salt will be used instead of saving a password
    // hash created by combining pw provided by user and the salt + applying one-way encryption
    hash: String,
    // string of chars unique to each user
    salt: String,
    type: {
        type: String,
        enum: USER_TYPES,
        default: 'patient'
    },

    medicalRecords: [{ type: mongoose.Schema.ObjectId, ref: 'MedicalRecords' }],
    receivedMotivation: [{ type: mongoose.Schema.ObjectId, ref: 'Motivation' }],
    sentEmergencyAlerts: [{ type: mongoose.Schema.ObjectId, ref: 'Alert' }]
});

patientSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

patientSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

// whenever user registers/logs in we need to generate a jwt
patientSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        type: this.type,
        exp: parseInt(expiry.getTime() / 1000),
    }, JWT_SECRET);
}

// // Create an instance method for authenticating user
patientSchema.methods.authenticate = function (password) {
    //compare the hashed password of the database
    //with the hashed version of the password the user enters
    // return this.password === bcrypt.hashSync(password, saltRounds);
    return this.password == password;
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
patientSchema.set('toJSON', {
    getters: true,
    virtuals: true
});


module.exports = mongoose.model('Patient', patientSchema);
