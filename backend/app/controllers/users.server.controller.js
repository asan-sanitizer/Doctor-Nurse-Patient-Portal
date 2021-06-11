// Load the module dependencies
const User = require("mongoose").model("User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const nurseServerModel = require("../models/nurse.server.model");
const medicalRecordServerModel = require("../models/medicalrecord.server.model");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

//const mongoose = require('mongoose');
const MedicalRecords = require("mongoose").model("MedicalRecords");
const Nurse = require("mongoose").model("Nurse");
const Users = require("mongoose").model("User");

//
// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

exports.createNurse = function (req, res, next) {
  console.log("Creating patient ", req.body);
  const newNurse = new Nurse(req.body);
  newNurse.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(newNurse);
    }
  });
};

exports.createPatient = function (req, res, next) {
  console.log("Creating patient ", req.body);
  const newPatient = new Nurse(req.body);
  newPatient.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(newPatient);
    }
  });
};

exports.getNurseDetail = function (req, res) {
  const id = req.params.nurseId;
  console.log("nurse id ", id);

  Nurse.findOne({ _id: id }, function (err, nurse) {
    if (err) {
      res.json({ status: "failure", msg: "Could not find nurse " });
    } else {
      console.log("found nurse ", nurse);
      res.json(nurse);
    }
  });
};

exports.listAllPatients = function (req, res) {
  console.log("list all patients ");
  Users.find({ type: "patient" }, function (err, users) {
    if (err) {
      res.json({ status: "failure", msg: "Could not find nurse " });
    } else {
      console.log(users);
      res.json(users);
    }
  });
};

exports.fetchMedicalRecords = async function (req, res, next) {
  console.log("Fetching all medical records ");
  await Users.findOne({ _id: req.params.patientId }, function (err, patient) {
    if (err) {
      res.json({ status: "failure", msg: "Could not find patient" });
    } else {
      //fetch the ids
      console.log("medical records ids  ", patient.medicalRecords);
      const medicalRecordIds = patient.medicalRecords;
	  getMedicalRecordDetails(req,res,medicalRecordIds);
    }
  });
};

exports.fetchMedicalDetail = async function (req, res, next) {
  //fetching the detail of medical record based on medicalRecordId
  await MedicalRecords.findById(req.params.medicalId, function(err, medicalDetail){
    if(err) {  next(err); }
    else {
      console.log("Got the medical record detail " , medicalDetail);
      res.json(medicalDetail);
    }
  });
};

const getMedicalRecordDetails = async function(req,res, medicalRecordIds ) {
	var result = [];
      for (var i = 0; i < medicalRecordIds.length; i++) {
        //   medicalRecordIds.forEach((medicalRecord) => {
        await MedicalRecords.findById(medicalRecordIds[i],
          function (err, record) {
			  if(record) {
				  console.log("Adding record ");
				  result.push(record);
				  console.log(record);
			  }
          }
        );
	  }
	  console.log( "getMedicalRecordDetails result :=  ",result);
	  res.send(result);
}

exports.addMedicalRecord = async function (req, res, next) {
  console.log('>>>>>>>>>>>>> Adding Medical Record req body: ', req.body);

  let medicalRecord = new MedicalRecords(req.body);

  await medicalRecord.save();

  await User.findOneAndUpdate(
    { _id: req.body.patient },
    { $push: { medicalRecords: medicalRecord._id } },
    function (err, patient) {
      if (err) {
        console.log("Err >>>> ", err);
        next(err);
      } else {
        console.log("Patient ", patient );
        patient.medicalRecords.push(medicalRecord._id);
        console.log("Adding medical record ", medicalRecord);
        console.log(" to ", patient );
        res.json(patient);
        // next();
      }
    }
  );


};

// Create a new user
exports.create = function (req, res, next) {
  console.log("Creating a new user ", req.body);
  // Create a new instance of the 'User' Mongoose model
  var user = new User(req.body); //get data from React form

  // Use the 'User' instance's 'save' method to save a new user document
  user.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      console.log("Created new user ");
      res.json(user);
    }
  });
};
//
// Returns all users
exports.list = function (req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};
//
//'read' controller method to display a user
exports.read = function (req, res) {
  // Use the 'response' object to send a JSON response
  res.json(req.user);
};
//
// 'userByID' controller method to find a user by its id
exports.userByID = function (req, res, next, id) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  User.findOne(
    {
      _id: id,
    },
    (err, user) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.user = user;
        console.log(user);
        // Call the next middleware
        next();
      }
    }
  );
};
//update a user by id
exports.update = function (req, res, next) {
  console.log(req.body);
  User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(user);
  });
};
// delete a user by id
exports.delete = function (req, res, next) {
  User.findByIdAndRemove(req.user.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
};
//
// authenticates a user
exports.authenticate = function (req, res, next) {
  // Get credentials from request
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log(password);
  console.log(username);
  //find the user with given username using static method findOne
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      console.log(user);
      //compare passwords
      // if(bcrypt.compareSync(password, user.password)) {
      if (user.authenticate(password)) {
        console.log("password match!!!");
        // Create a new token with the user id in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign(
          { id: user._id, username: user.username },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        console.log("token:", token);
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds
        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true,
        });
        // res.status(200).send({ screen: user.username });
        //
        res.json({
          status: "success",
          message: "user found!!!",
          userData: { user: user, token: token },
        });
        req.user = user;
        //call the next middleware
        // next()
      } else {
        res.json({
          status: "error",
          message: "Invalid username/password!!!",
          data: null,
        });
      }
    }
  });
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
  // We can obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;
  console.log(token);
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  // use back-quotes here
  res.send(`${payload.username}`);
};
//
//sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "signed out" });
  // Redirect the user back to the main application page
  //res.redirect('/');
};
//check if the user is signed in
exports.isSignedIn = (req, res) => {
  // Obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;
  console.log(token);
  // if the cookie is not set, return 'auth'
  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, token is ok, return the username given in the token
  res.status(200).send({ screen: payload.username });
};

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
  // Obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;
  console.log(token);
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
    console.log("in requiresLogin - payload:", payload);
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  // user is authenticated
  //call next function in line
  next();
};

module.exports.GetUserDetails = function (req, res, next) {
  let id = req.params.userId;
  console.log(id);
  User.findOne({ _id: id }, "-hash -salt")
    .populate({
      path:
        "authoredMotivation receivedAlerts medicalRecords receivedMotivation sentAlerts",
      populate: "author",
    })
    .exec((err, user) => {
      if (err) {
        return res.status(400).send({ message: err });
      }
      console.log("Get User Details:", user);
      return res.status(200).json(user);
    });
};
