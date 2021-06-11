const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = mongoose.Schema({
    sentBy: {
       type: mongoose.ObjectId,
       ref: 'User' 
    },
    receiver: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    },
    message: { type: String, 
        required: true 
    },
    dateRecorded: { 
        type: Date, 
        default: Date.now 
    }
});
// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
AlertSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('Alert', AlertSchema);