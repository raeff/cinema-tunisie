

var mongoose = require('mongoose');
require('../models/OrderModel');

Orders = mongoose.model('Orders');
// save order method
exports.save = function (order) {
  // console.log("inside order");
    const neworder = new Orders(order);
  // console.log("before order save");
    const promise = neworder.save();
 // console.log(promise);
    return promise;
};

exports.get = function (orderId) {
  const promise = Orders.findById(orderId).exec();
  return promise;
};
/**
 * Returns an all orders.
 *
 */
exports.orderList = function() {
    const promise = Orders.find().exec();
    return promise;
}


/**
 * Returns the order object matching the user id.
 *
 * @param {string} userId {Id of the User object which has made movie booking orders}
 */
exports.user_orders = function (userId) {
    const promise = Orders.find({userid: userId}).exec();
    return promise
};
exports.movie_orders = function (movieId) {
  const promise = Orders.find({movieid: movieId}).exec();
  return promise
};

exports.get_orderfor_bookedseats =function(tId,mId,showTime,date)
{
 //   console.log(tId,mId,showTime,date); 
    const promise = Orders.find({theaterid: tId,movieid: mId,showtime:showTime}).exec();    
    return promise;
}

exports.get_orderfor_theater =function(tId)
{
 //   console.log(tId,mId,showTime,date); 
    const promise = Orders.find({theaterid: tId}).exec();    
    return promise;
}

exports.delete = function (orderId) {
  const promise = Orders.findByIdAndRemove(orderId)
  if (!promise) return res.status(404).send('The order with the given ID was not found.');
  return promise;
};



exports.update = function (order) {
  const promise = Orders.findOneAndUpdate({ _id: order._id }, order).exec();
  return promise;
};



