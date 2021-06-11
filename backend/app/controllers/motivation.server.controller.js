const User = require("mongoose").model("User");
const Motivation = require("mongoose").model("Motivation");

exports.sendMotivation = async function (req, res, next) {
  console.log("Sending motivation >>>>>>> ");
  let motivation = new Motivation(req.body);
  await motivation.save();
  console.dir("motivation saved with id ", motivation._id);

  //find the patient
  User.findOneAndUpdate(
    { username: req.body.patientUsername },
    { $push: { receivedMotivation: motivation._id } },
    function (err, patient) {
      if (err) {
        console.log("Err >>>> ", err);
        next(err);
      } else {
        patient.receivedMotivation.push(motivation._id);
        console.dir(patient);
        next();
      }
    }
  );
};

exports.getMotivations = async function (req, res, next) {
  console.log("Getting motivation for user ", req.params.patientUsername);

  User.findById(req.params.patientId, function (err, patient) {
    if (err) {
      console.log(" error ", err);
      next(err);
    } else {
      //get the list of all motivations ids
      console.log(patient.receivedMotivation);
      const motivationIds = patient.receivedMotivation;
      motivationDetail(req, res, next, motivationIds);
    }
  });
};

const motivationDetail = async function (req, res, next, motivationIds) {
  var result = [];
  for (var i = 0; i < motivationIds.length; i++) {
    console.log(motivationIds[i]);
    await Motivation.findById(motivationIds[i], function (err, motivation) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        result.push(motivation.message);
      }
    });
  }
  console.log("All Motivation fetched ", result);
  res.json(result);
  // next();
};
