const express=require('express');
const UserRouter=express.Router();

const userController=require('../controller/users');
const orderController = require('../controller/order');
const paymentController = require('../controller/payment');
const ratingController = require('../controller/ratings');
const tableController = require('../controller/table');

//Registration
UserRouter.post('/register',userController.register);

//LogIn
UserRouter.post('/login',userController.login);

//reset password
UserRouter.put('/resetPassword',userController.resetPassword);


//Creating the order
UserRouter.post('/order',orderController.createOrder);

//review the order
UserRouter.get('/order/review/:customerId',orderController.reviewOrder);

//making a payment
UserRouter.post('/payment',paymentController.makePayment);

//feedback
UserRouter.post('/ratings',ratingController.addRatings)

//booking a table
UserRouter.post('/bookTable',tableController.bookTable);



module.exports=UserRouter