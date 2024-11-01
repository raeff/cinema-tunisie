'use strict';
module.exports = function (app) {
    let user = require('../controllers/UserController');
    let login = require('../controllers/loginController');
    let orderlist = require('../controllers/OrderController');
    let theatrelist = require('../controllers/TheatreController');
    let showtimelist = require('../controllers/ShowTimeController');
    let reviewlist = require('../controllers/ReviewController');
    let signUp = require('../controllers/SignUpController');
    let movieList = require('../controllers/MovieController');
    let post = require('../controllers/PostController');
    let forgotPassword = require('../controllers/ForgotPasswordController')



    app.route('/users')
        .get(user.lisUsers)
    app.route('/user/:userId')   
        .delete(user.deleteUser)    
    app.route('/user/:_id') 
        .get(user.getUser)
        .delete(user.deleteUser)
    app.route('/users/:_id')
        //get users by id  
        .get(user.getProfile)
        .put(user.updateUser);   
    app.route('/user')
        // get data for user profile
        .put(user.profile);


    app.route('/signUp')
        // add user data for account
        .post(signUp.signUp);


    app.route('/login')
        // check login
        .post(login.login);



    app.route('/orders')
        .get(orderlist.list_all_orders)
        .post(orderlist.create_order);
    app.route('/theater-orders/:theaterId')
        .get(orderlist.get_orderfor_theater)
    app.route('/orders/:orderId')
        .get(orderlist.readOrder)
        .put(orderlist.updateOrder)
        .delete(orderlist.deleteOrder);
    //added by Dharati on 04/21/2019        
    app.route('/orders/:theaterId/:movieId/:showTime/:date')
        // get data from order table based on booked seats
        .get(orderlist.get_orderfor_bookedseats);
    app.route('/user-orders/:userId')
        .get(orderlist.user_orders);
    app.route('/movie-orders/:movieId')
        .get(orderlist.get_orderfor_movie);

    
        

    app.route('/createPost')
        .post(post.create_post)
    app.route('/Posts')
        .get(post.getAll_post)


 



    app.route('/theatres')
        // create theater       
        .post(theatrelist.create_theatre)
        // fetch all theater 
        .get(theatrelist.list_all_theaters);
    app.route('/theatres/:theaterId')
        .get(theatrelist.theater_detail);




    app.route('/showtime')
        //fetch all show time      
        .get(showtimelist.list_all_showtime)
        // create showtime
        .post(showtimelist.create_showtime);
    app.route('/showtimes/st/:showId')
        .get(showtimelist.show_detail)
        .delete(showtimelist.show_remove);
    app.route('/showtime/:movieId')
        .get(showtimelist.list_by_movie)
    app.route('/showtimes/:showtimeId')
        .put(showtimelist.updateShowtime)



    app.route('/reviews')
        // get all reviews
        .get(reviewlist.list_all_reviews)
        //post review
        .post(reviewlist.create_review);
    app.route('/reviews/:userId')
        .get(reviewlist.user_reviews)
    app.route('/movie-reviews/:movieId')
        .get(reviewlist.list_reviews_each_movie)
    app.route('/reviews/:reviewId')
        // get review by id
        .delete(reviewlist.delete)




    app.route('/movies')
        .get(movieList.listMovies)
        .post(movieList.createMovies);
    app.route('/movies-theatre/:theatreId')
        // read movie
        .get(movieList.theater_movies)
    app.route('/movies/:movieId')
        // read movie
        .get(movieList.readMovie)
        // update movie
        .put(movieList.updateMovie)
         // update movie
         .delete(movieList.deleteMovie)




    app.route('/auth/forgot_password')
        //change password
        .put(forgotPassword.sendForgotPasswordEmail);
    app.route('/auth/reset_password')
        .put(forgotPassword.reset_password);
};

