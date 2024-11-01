'use strict';
let mongoose = require('mongoose');
require('../models/UserModel');


let User = mongoose.model('User');
 
/**
 * Updates and returns the user details.
 *
 * @param {User} user {User object}
 */
exports.updateUser = function (user) {
    const promise = User.findOneAndUpdate({_id: user._id},user).exec();
    return promise;
};
exports.delete = function (userId) {
    const promise = User.findByIdAndRemove(userId)
    if (!promise) return res.status(404).send('The user with the given ID was not found.');
    return promise;
  };

/**
 * Get user details with user id
 *
 * @param {User} user {User object}
 */
exports.getUserDetails =function (_id) {
    console.log(_id);
    const promise = User.findOne({_id:_id}).exec();
    return promise
};

exports.search = function (params) {
    const promise = User.find(params).exec()
    return promise;
};




exports.getuser = function (userId) {
 
    const promise = User.findById(userId).exec();
    return promise;
};