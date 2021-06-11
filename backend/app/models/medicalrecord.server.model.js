const mongoose = require('mongoose');

const MedicalRecordSchema= mongoose.Schema({
   bodyTemperature: Number,
   // measured in bpm, beats per minute   
   pulseRate: Number,
   // measured in bpm, breaths per minute
   repirationRate: Number,
   // bp is recorded as two readings: High systolic pressure and lower diastolic or resting pressure; normal reading would be 120/80
//    bloodPressure: {
       systolic: Number,
       diastolic: Number,
//    },
   comments: String,
   patient: {
       required: true,
       type: mongoose.Schema.ObjectId,
       ref: 'User'
   },
   nurse: {
       required: true,
       type: mongoose.Schema.ObjectId,
       ref: 'User'
   },
   dateRecorded: { type: Date, default: Date.now }
});

MedicalRecordSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('MedicalRecords', MedicalRecordSchema);