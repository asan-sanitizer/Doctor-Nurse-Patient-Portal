var patients = require('../../app/controllers/patient.server.controller');
var users = require('../../app/controllers/users.server.controller');
var express = require('express');
module.exports = function (app){
    app.route('/medicalRecords').post(patients.EnterMedicalRecords);
    app.get('/userDetails/:userId', users.GetUserDetails);
    app.post('/emergencyAlert', patients.submitEmergencyAlert);
    app.post('/motivations', patients.SendMotivation);
    app.post('/symptoms', patients.checkSymptoms);
    app.param('userId', users.userByID);
}