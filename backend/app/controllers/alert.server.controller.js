const Alert = require("mongoose").model("Alert");
const User = require("mongoose").model("User");


exports.sendAlert = async function (req, res, next) {
  console.log("Sending motivation >>>>>>> ");
  let nurseId = "";
  await User.findOne({ username: req.body.receiver }, function (err, nurse) {
    if (nurse) {
      nurseId = nurse._id;
      console.log("found id ", nurseId);
    }
  });

  //create and save alert
  let alert = new Alert();
  alert.sentBy = req.body.sentBy;
  alert.receiver = nurseId;
  alert.message = req.body.message;
  await alert.save();
  console.log("Saved alert with id ", alert._id);

  await User.findOneAndUpdate(
    { username: req.body.receiver},
    { $push: { receivedEmergencyAlerts: alert._id } },
    function (err, nurse) {
      if (err) {
        console.log("Err >>>> ", err);
        next(err);
      } else {
        nurse.receivedEmergencyAlerts.push(alert._id);
        console.dir(nurse);
        res.json(nurse);
      }
    }
  );

};

exports.getAlerts = async function(req,res,next) {
  console.log("Alerts for nurse ", req.params.nurseUsername);
  
  await User.findOne({username: req.params.nurseUsername}, function(err, nurse) {
    if (err) {  console.log(err); next(err); }
    else {
      //get the alerts ids 
      console.log( "Nurse found " ,nurse );
      const alertIds = nurse.receivedEmergencyAlerts;
      getAlertDetails(req,res,next, alertIds);
      // res.json(nurse);
      // next();
    }
  });
};

const getAlertDetails = async function (req,res,next, alertIds) {
  let result = [];
  for(var i = 0; i < alertIds.length; i++) {
    await Alert.findById(alertIds[i], function( _ , alert ){
      if(alert) {
        result.push(alert);
      }
    })
  }

  res.json(result);
}