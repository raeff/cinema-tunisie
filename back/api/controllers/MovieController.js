





'use strict';
//import user service.
const movieService = require('../services/movieServices');

/**
 * Returns a list of contacts in JSON
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */



//function to get list of movies
exports.listMovies = function (req, res) {
    const resolve = (movies) => {
        res.status(200);
        res.json(movies);
    };
    movieService.search({})
        .then(resolve)
        .catch(renderErrorResponse(res));
};

//function ton create movies
exports.createMovies = function (req, res) {
    const newmovie = Object.assign({}, req.body);
    const resolve = (movie) => {
        res.status(200);
        res.json(movie);
    }; 
    movieService.save(newmovie)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

//function to read movie
exports.readMovie = function (req, res) {
    const resolve = (movie) => {
        res.status(200);
        res.json(movie);
    };
    movieService.get(req.params.movieId)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.theater_movies = function (request, response) {
    const resolve = (t_movies) => {
        response.status(200);
        response.json(t_movies);
    };
    movieService.theater_movies(request.params.theatreId)
        .then(resolve)
        .then(console.log("theater id " + request.params.theatreId))
        .catch(renderErrorResponse(response));
};






//function to edit and update movies
exports.updateMovie = function (req, res) {
    const movie = Object.assign({}, req.body);
    const resolve = (movie) => {
        res.status(200);
        res.json(movie);
    };
    movie._id = req.params.movieId;
    movieService.update(movie)
    
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.deleteMovie = function (req, res) {
    const resolve = (movie) => {
        res.status(200);
        res.json(movie);
    };
    movieService.delete(req.params.movieId)
        .then(resolve)
        .catch(renderErrorResponse(res));
};



let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};