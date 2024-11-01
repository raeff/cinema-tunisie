
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var Posts = new Schema(    {
  userid :{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},

  description: { type: String, required: true },
  date: {type: Date, default: Date.now()},
}
);

var postModel = mongoose.model('Posts', Posts);
module.exports = postModel;
module.exports = Posts
