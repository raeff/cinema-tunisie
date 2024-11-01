'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Orders = new Schema({
   
    userid :{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    theaterid : {type:mongoose.Schema.Types.ObjectId, ref:"theatreModel"},
    movieid :{type:mongoose.Schema.Types.ObjectId, ref:"movieModel"},
    
    showtime:{
        type:String,
        required:'Show time is mandatory.'
    },
    showtimedate:{
        type:String,
        required:'Show date is mandatory.'
    },
    seatdetails:{
        type:String,
        required:'Number of seats are mandatory'
    },
    totalamount:{
        type: Number,
        required:'kindly enter total amount.'
    },

    creationtime: {type: Date, default: Date.now()},   
    qr:String
});
// exports model
var orderModel = mongoose.model('Orders', Orders);

module.exports = orderModel;
module.exports = Orders
