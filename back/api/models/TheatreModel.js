'use strict';
//initiate mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TheatreSchema = new Schema({   
  
    theatreName :{
        type:String,
        required:'kindly enter your theatreName.'
    },
    theatreImage: {
        type: String,
        required: 'theatre Image name is mandatory field'
    },
    description :{
        type:String,
        required:'kindly enter your description.'
    },
    position :{
        type:String,
        required:'kindly enter your position.'
    },
    latitude :{
        type:Number,
        required:'kindly enter your latitude.'
    },
    longitude :{
        type:Number,
        required:'kindly enter your longitude.'
    }
});

var theatreModel = mongoose.model("Theatre", TheatreSchema);
module.exports = theatreModel;
module.exports = TheatreSchema;