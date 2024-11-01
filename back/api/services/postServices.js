

let mongoose = require('mongoose');
require('../models/PostModel');

Post = mongoose.model('Posts');
// save order method
exports.save = function (post) {
  // console.log("inside order");
    const newpost = new Post(post);
  // console.log("before order save");
    const promise = newpost.save();
 // console.log(promise);
    return promise;
};


/**
 * Returns an all orders.
 *
 */
exports.postList = function() {
    const promise = Post.find().exec();
    return promise;
}


