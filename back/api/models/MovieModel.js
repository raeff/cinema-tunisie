'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movies = new Schema({
//movie schema defined

theaterid: [{
    type: String,
   
}],
    movieName: {
        type: String,
        required: 'Name of movie is mandatory field.'
    },
    movieImage: {
        type: String,
        required: 'Movie Image name is mandatory field'
    },
    movieURL: {
        type: String,
        required: 'Movie URL is a mandatory field'
    },
    movieLength: {
        type: String,
        required: 'Length of Movie is mandatory field.'
    },
    movieReleaseDate: {
        type: String,
        required: 'Movie Release Date'
    },

    directorName: {
        type: String,
        required: 'Name of the director is mandatory field.'
    },
    language: {
        type: String,
        required: 'Language is a Mandatory field.'
    },
    movieType: {
        type: String,
        required: 'Movie type is mandatory field..'
    },
    synopsis: {
        type: String,
        required: 'Synopsis type is mandatory field..'
    },
    rating: {
        type: String,
        required: 'Rating is a mandatory field.'
    },
    feedback: {
        type: Number,
        required: 'feedback is a mandatory field',
        default: 0,
        
    },
    orders: {
        type: Number,
        required: 'feedback is a mandatory field',
        default: 0,
        
    }
});
// exports model
var movieModel = mongoose.model('Movies', Movies);

module.exports = movieModel;
module.exports = Movies


