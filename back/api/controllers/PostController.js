'use strict';
//import review service.
  


const postService = require('../services/postServices');

let mongoose = require('mongoose');
let Post = mongoose.model('Posts');


exports.create_post = function  (req, res) {
    console.log("post");
    const newPost = Object.assign({}, req.body);
    console.log(newPost);
    const resolve = (post) => {
        res.status(200);
        res.json(post);
    };
    postService.save(newPost)
        .then(resolve)
     
        .catch(renderErrorResponse(res));
}





/**
* Returns a list of orders in JSON
*
* @param {request} {HTTP request object}
* @param {response} {HTTP response object}
*/
exports.getAll_post = function (request, response) {
    Post.aggregate([
      
        { '$lookup': { from: 'users', localField: 'userid', foreignField: '_id', as: 'userRef' } },
        { '$unwind': '$userRef' },
    

    ]).exec(function (err, docs) {
        response.json(docs);
    });
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