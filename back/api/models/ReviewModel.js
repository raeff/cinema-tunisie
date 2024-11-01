'use strict';
//initiate mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reviews = new Schema({

 
    userid :{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},


    movieid :{type:mongoose.Schema.Types.ObjectId, ref:"movieModel"},

 
    desc: {
        type: String,
        required: 'kindly enter desc.'
    },
    rating: {
        type: Number,
        required: 'kindly enter rating.'
    },
    date: {
        type: Date,
        required: 'Date is a mandatory field',
        default: Date.now,
    }

});
// exports model
var reviewModel = mongoose.model('Reviews', Reviews);

module.exports = reviewModel;
module.exports = Reviews