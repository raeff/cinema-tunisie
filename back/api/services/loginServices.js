'use strict';

let mongoose = require('mongoose');
require('../models/UserModel');
var bcrypt = require("bcryptjs");

let User = mongoose.model('User');
/**Login with username and password and returns username
 *
 * @param {User} user {User object}
 */
exports.login = async function (request) {



    const body = request.body;
    const user = await User.findOne({ username: body.username });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const promise = User.findOne({username: body.username});
        return promise;}
        else {
            const promise = User.findOne({username: body.username, password: body.password});
            return promise; }
      }
      else{
        const promise = User.findOne({username: body.username, password: body.password});
        return promise; 
      }


  
};
