const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: 'String',
        required: true
    }, 
    year: {
        type: 'String',
        required: true
    }, 
    plot: {
        type: 'String',
        required: true,
        minlength: 10
    },
    poster: {
        type: 'String', 
        required: true
    },
    actors: [ String ]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;