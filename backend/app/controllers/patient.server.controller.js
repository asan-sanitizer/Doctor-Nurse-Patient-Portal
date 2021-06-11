// Load the module dependencies
const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;
const Motivation = require('mongoose').model('Motivation');
const Alert = require('mongoose').model('Alert');
const MedicalRecords = require('mongoose').model('MedicalRecords');
const ml = require('machine_learning');

//Method for entering medical records by a nurse
exports.EnterMedicalRecords = function (req, res, next) {
    console.log('Adding Medical Record req body: ', req.body);

    let medicalRecords = new MedicalRecords();
    medicalRecords.bodyTemperature = req.body.bodyTemperature;
    medicalRecords.pulseRate = req.body.pulseRate;
    medicalRecords.repirationRate = req.body.repirationRate;
    medicalRecords.systolic= req.body.systolic;
    medicalRecords.diastolic= req.body.diastolic;
    medicalRecords.comments = req.body.comments;
    medicalRecords.patient = req.body.patient;
    medicalRecords.nurse = req.body.nurse;

    User.findByIdAndUpdate(medicalRecords.patient,
        { $push: { medicalRecords: medicalRecords._id } },
        { new: true },
        (err, updatedPatient) => {
            if (err) {
                return res.status(400).send('Could not update Patient details');
            } else {
                medicalRecords.save((err) => {
                    if (err) {
                        return res.status(400).send('Could not save medicalRecords details');
                    } else {
                        return res.status(200).json(updatedPatient);
                    }
                })
            }
        }

    )
};

//Method for sending emergency alerts by a patient
module.exports.submitEmergencyAlert = function (req, res, next) {
    let alert = new Alert();
    alert.sentBy = req.body.sentBy;
    alert.receiver = req.body.receiver;
    alert.message = req.body.message;
    alert.dateRecorded = req.body.dateRecorded;
    //console.log(Date.now);

    User.findByIdAndUpdate(alert.sentBy,
        { $push: { sentEmergencyAlerts: alert._id } },
        { new: true },
        (err, updatedPatient) => {
            if (err) {
                return res.status(400).send('Could not update Patient details');
            } else {
                console.log('Detials saved');
                User.findByIdAndUpdate(alert.receiver,
                    { $push: { receivedEmergencyAlerts: alert._id } },
                    { new: true },
                    (err, updatedNurse) => {
                        if (err) {
                            return res.status(400).send('Could not update Nurse details');
                        } else {
                            alert.save((err) => {
                                if (err) {
                                    return res.status(400).send('Could not save Emergency alert details');
                                } else {
                                    return res.status(200).json(alert);
                                }
                            })
                        }
                    }

                )
            }
        });
};

module.exports.SendMotivation = function (req, res, next) {
    let motivation = new Motivation();
    motivation.author = req.body.author;
    motivation.patient = req.body.patient;
    motivation.message = req.body.message;
    motivation.type = req.body.type;
    // console.log('req body: ', req.body);
    // console.log('motivation doc', motivation);

    User.findByIdAndUpdate(motivation.author,
        { $push: { authoredMotivation: motivation._id } },
        { new: true },
        (err, updatedNurse) => {
            if (err) {
                return res.status(400).send('Could not update Nurse details');
            } else {
                User.findByIdAndUpdate(motivation.patient,
                    { $push: { receivedMotivation: motivation._id } },
                    { new: true },
                    (err, updatedPatient) => {
                        if (err) {
                            return res.status(400).send('Could not update Patient details');
                        } else {
                            motivation.save((err) => {
                                if (err) {
                                    return res.status(400).send('Could not save Motivation details');
                                } else {
                                    return res.status(200).json(motivation);
                                }
                            })
                        }
                    }

                )
            }
        });
};

exports.checkSymptoms = function (req, res) {
    // module.exports.checkConditions = function (req, res) {
    //read the new data
    let coughing = req.body.coughing;

    let highFever = req.body.highFever;

    let aching = req.body.aching;

    let noTasteOrSmell = req.body.aching;

    let data = [
        ['no', 'no', 'no', 'no'],//1
        ['no', 'no', 'no', 'yes'],//2
        ['no', 'no', 'yes', 'no'],//3
        ['no', 'no', 'yes', 'yes'],//4
        ['no', 'yes', 'no', 'no'],//5
        ['no', 'yes', 'no', 'yes'],//6
        ['no', 'yes', 'yes', 'no'],//7
        ['no', 'yes', 'yes', 'yes'],//8
        ['yes', 'no', 'no', 'no'],//9
        ['yes', 'no', 'no', 'yes'], // 10
        ['yes', 'no', 'yes', 'no'], // 11
        ['yes', 'no', 'yes', 'yes'],//12
        ['yes', 'yes', 'no', 'no'],//13
        ['yes', 'yes', 'no', 'yes'],//14
        ['yes', 'yes', 'yes', 'no'],//15
        ['yes', 'yes', 'yes', 'yes']//16
    ];
    
    let result = ['None', 'None', 'None', 'Fatigue', 'Fever', 'Covid-19', 'Fever', 'Covid-19', 
    'Common Flu', 'Covid-19', 'Fever', 'Covid-19', 'Fever', 'Covid-19', 'Fever', 'Covid-19'];

    //create new Decision Tree using this dataset
    let dt = new ml.DecisionTree({
        data: data,
        result: result
    });

    dt.build();

    console.log("Classify : ", dt.classify([coughing, highFever, aching, noTasteOrSmell]));
    let classificationResult = dt.classify([coughing, highFever, aching, noTasteOrSmell]);
    let tree = dt.getTree();
    dt.prune(1.0); // 1.0 : mingain.

    let classsification = JSON.stringify(classificationResult);
    let classResult = classsification.substring(2, classsification.length - 4);

    let medicalAttention = '';

    if (classResult === "Covid-19" || classResult === "Fever") {
        medicalAttention = 'Yes';
    } else {
        medicalAttention = "No";
    }

    let obj = {
        condition: classResult,
        attn: medicalAttention
    };

    return res.status(200).json(obj);
};
