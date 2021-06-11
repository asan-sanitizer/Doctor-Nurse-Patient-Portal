// Load the 'users' controller
var users = require("../../app/controllers/users.server.controller");
var patient = require("../../app/controllers/patient.server.controller");
var alert = require("../controllers/alert.server.controller");
var express = require("express");
const { sendMotivation, getMotivations } = require("../controllers/motivation.server.controller");
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {

  app.get('/fetchPatients' , users.listAllPatients);

  app.get('/fetchMedicalRecords/:patientId', users.fetchMedicalRecords);

  app.get('/fetchMedicalDetail/:medicalId', users.fetchMedicalDetail);

  app.get('/fetchAlerts/:nurseUsername', alert.getAlerts);

  app.post('/addMedicalRecord', users.addMedicalRecord);

  app.post('/sendAlert',alert.sendAlert);

  app.post('/sendMotivation', sendMotivation);

  app.get('/getMotivations/:patientId', getMotivations);

  //go to http://localhost:3000/users to see the list
  app.get("/users", users.requiresLogin, users.list);

  //handle a post request made to root path
  app.post("/", users.create);

  //
  // Set up the 'users' parameterized routes
  app
    .route("/users/:userId")
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.param("userId", users.userByID);

  //authenticate user
  app.post("/auth", users.authenticate);

  app.get("/signout", users.signout);
  app.get("/read_cookie", users.isSignedIn);
  //path to a protected page
  app.get("/welcome", users.welcome);
};
