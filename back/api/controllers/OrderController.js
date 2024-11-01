'use strict';
//import order service.
const orderService = require('../services/orderServices');
const emailService = require('../services/emailServices');
let mongoose = require('mongoose');
let Order = mongoose.model('Orders');

exports.user_orders = function (request, response) {
    Order.aggregate([
        { $match: { userid: mongoose.Types.ObjectId(request.params.userId) } },
        { '$lookup': { from: 'users', localField: 'userid', foreignField: '_id', as: 'userRef' } },
        { '$unwind': '$userRef' },
        { '$lookup': { from: 'theatres', localField: 'theaterid', foreignField: '_id', as: 'theaterRef' } },
        { '$unwind': '$theaterRef' },
        { '$lookup': { from: 'movies', localField: 'movieid', foreignField: '_id', as: 'movieRef' } },
        { '$unwind': '$movieRef' }

    ]).exec(function (err, docs) {
        response.json(docs);
    });
}
/**
* Returns a list of orders in JSON
*
* @param {request} {HTTP request object}
* @param {response} {HTTP response object}
*/
exports.list_all_orders = function (request, response) {
    Order.aggregate([
      
        { '$lookup': { from: 'users', localField: 'userid', foreignField: '_id', as: 'userRef' } },
        { '$unwind': '$userRef' },
        { '$lookup': { from: 'theatres', localField: 'theaterid', foreignField: '_id', as: 'theaterRef' } },
        { '$unwind': '$theaterRef' },
        { '$lookup': { from: 'movies', localField: 'movieid', foreignField: '_id', as: 'movieRef' } },
        { '$unwind': '$movieRef' }

    ]).exec(function (err, docs) {
        response.json(docs);
    });
};

//code for post method
exports.create_order = function (req, res) {
    console.log("order");
    const newOrder = Object.assign({}, req.body);
    console.log(newOrder);
    const resolve = (order) => {
        res.status(200);
        res.json(order);
    };
    orderService.save(newOrder)
        .then(resolve)
        .then(emailService.email(newOrder))
        .catch(renderErrorResponse(res));
};
exports.readOrder = function (req, res) {
    const resolve = (order) => {
        res.status(200);
        res.json(order);
    };
    orderService.get(req.params.orderId)
        .then(resolve)
        .catch(renderErrorResponse(res));
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
 * Returns a contact object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.get_orderfor_bookedseats = function (req, response) {
    //get order for booked seats
    const resolve = (u_orders) => {
        response.status(200);
        console.log(u_orders);
        response.json(u_orders);
    };
    orderService.get_orderfor_bookedseats(req.params.theaterId, req.params.movieId, req.params.showTime, req.params.date)
        .then(resolve)
        .catch(renderErrorResponse(response));

}


exports.get_orderfor_theater = function (req, response) {
    //get order for booked seats
    const resolve = (t_orders) => {
        response.status(200);
        console.log(t_orders);
        response.json(t_orders);
    };
    orderService.get_orderfor_theater(req.params.theaterId)
        .then(resolve)
        .catch(renderErrorResponse(response));

}
exports.get_orderfor_movie = function (req, response) {
    //get order for booked seats
    const resolve = (m_orders) => {
        response.status(200);
        console.log(m_orders);
        response.json(m_orders);
    };
    orderService.movie_orders(req.params.movieId)
        .then(resolve)
        .catch(renderErrorResponse(response));

}
exports.deleteOrder = function (req, res) {
    const resolve = (order) => {  
        res.status(200);
        res.json(order);
    };
    orderService.delete(req.params.orderId)
        .then(resolve)
        .catch(renderErrorResponse(res));
};


exports.updateOrder = function (req, res) {
    const order = Object.assign({}, req.body);
    const resolve = (order) => {
        res.status(200);
        res.json(order);
    };
    order._id = req.params.orderId;
    orderService.update(order)
    
        .then(resolve)
        .catch(renderErrorResponse(res));
};


// exports.user_orders = function (request, response) {
//     Order.aggregate([
//         { $match: {}}

//     ]

//     )
//     const resolve = (u_orders) => {
//         response.status(200);
//         response.json(u_orders);
//     };
//     orderService.user_orders(request.params.userId)
//         .then(resolve)
//         .catch(renderErrorResponse(response));
// };


