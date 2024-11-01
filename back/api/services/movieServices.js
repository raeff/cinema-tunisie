
//using all the mongoose methods find. findById, save
var mongoose = require('mongoose');
require('../models/MovieModel');
Movies = mongoose.model('Movies');

exports.search = function (params) {
    const promise = Movies.find(params).exec()
    return promise;
};


/**
 *This is to save the movies
 *
 */
exports.save = function (movie) {
    const newMovie = new Movies(movie);
    const promise = newMovie.save();
    return promise;
};


/**
 *This is to get the movie by id
 *
 */
exports.get = function (movieId) {
    const promise = Movies.findById(movieId).exec();
    return promise;
};

exports.delete = function (movieId) {
    const promise = Movies.findByIdAndRemove(movieId)
    if (!promise) return res.status(404).send('The film with the given ID was not found.');
    return promise;
};

/**
 * This is to update the a particular movie id
 *
 */
exports.update = function (movie) {
    const promise = Movies.findOneAndUpdate({ _id: movie._id }, movie).exec();
    return promise;
};


exports.theater_movies = function (theaterId) {
    //   console.log('finding' - userId)
        const promise = Movies.find({ theaterid: theaterId }).exec();
        return promise
    };
