const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    sex: {
        type: 'String',
        required: true
    },
    dob: {
        type: 'String',
        required: true
    },
    bio: {
        type: 'String',
        required: true
    }
});

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;