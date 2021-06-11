const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotivationSchema = mongoose.Schema({
    author: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    },
    patient: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    },
    message: { 
        type: String, 
        required: true 
    },
    dateRecorded: { 
        type: Date, 
        default: Date.now 
    }
});
// Configure the 'MotivationSchema' to use getters and virtuals when transforming to JSON
MotivationSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Motivation' model out of the 'MotivationSchema'
//mongoose.model('Motivation', MotivationSchema);
module.exports = mongoose.model('Motivation', MotivationSchema);