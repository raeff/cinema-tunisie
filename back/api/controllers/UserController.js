const profileService = require('../services/userServices');
const jwt = require("jsonwebtoken");
let config = require('../../config');
/**
 * Returns access token and user details after updating profile
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.profile = function (request, response) {
    let token = request.headers['authorization'];
    const resolve = (res) => {
        if (res !== null) {
            response.json({
                status: 200,
                message: "User details updated successfully",
                user: res
            });
        } else {
            response.json({
                status: 401,
                message: 'User id needed'
            });
        }
    };
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log('token' + token);
    }
    if (token) {
        jwt.verify(token, Buffer.from(config.secret).toString('base64'), (err, decoded) => {
            if (err) {
                console.log('Error' + err);
                return response.json({
                    status: 401,
                    message: 'Token is not valid'
                });
            } else {
                if (!request.body.phoneNo) {
                    return response.json({
                        status: 400,
                        message: 'Error in request, Please check the request'
                    });
                } else {
                    profileService.updateUser(request.body)
                        .then(resolve)
                        .catch(renderErrorResponse(response));
                }
            }
        });
    } else {
        return response.json({
            status: 401,
            message: 'Auth token is not supplied'
        });
    }
};
// error function
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

/**
 * Returns profile details
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getProfile = function (request, response) {
    let token = request.headers['authorization'];
    const resolve = (res) => {
        if (res !== null) {
            response.json({
                status: 200,
                message: "User details fetched successfully",
                user: res
            });
        } else {
            response.json({
                status: 401,
                message: 'User id needed'
            });
        }
    };
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log('token' + token);
    }
    if (token) {
        jwt.verify(token, Buffer.from(config.secret).toString('base64'), (err, decoded) => {
            if (err) {
                console.log('Error' + err);
                return response.json({
                    status: 401,
                    message: 'Token is not valid'
                });
            } else {
                profileService.getUserDetails(request.params._id)
                    .then(resolve)
                    .catch(renderErrorResponse(response));
            }

        });
    } else {
        return response.json({
            status: 401,
            message: 'Auth token is not supplied'
        });
    }
};

exports.lisUsers = function (req, res) {
    const resolve = (users) => {
        res.status(200);
        res.json(users);
    };
    profileService.search({})
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.updateUser = function (req, res) {
    const user = Object.assign({}, req.body);
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    };
    user._id = req.params._id;
    profileService.updateUser(user)
    
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.getUser = function (req, res) {
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    };
    profileService.getuser(req.params._id)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.deleteUser = function (req, res) {
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    };
    profileService.delete(req.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(res));
};
