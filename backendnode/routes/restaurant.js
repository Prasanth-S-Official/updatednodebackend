const express=require('express');
const restaurantRouter=express.Router();

const menuController = require('../controller/menu');
const tableController = require('../controller/table');
const userController = require('../controller/users');
const paymentController = require('../controller/payment');


//Adding a menu item
restaurantRouter.post('/addMenu',menuController.addMenuItem);
//Editing menu items
restaurantRouter.put('/editMenu/:_id',menuController.editMenuItem);
//Getting all menu items
restaurantRouter.get('/getAllMenu',menuController.getAllMenuItems);


//Adding a table
restaurantRouter.post('/addTable',tableController.addTable);
//Getting table status
restaurantRouter.get('/table',tableController.getTableStatus);
//editing the table status
restaurantRouter.put('/table/editStatus',tableController.editTableStatus);

//Getting all users accounts
restaurantRouter.get('/getAllUsers',userController.getAllUsers);

//Getting all payment details
restaurantRouter.get('/getAllPayments',paymentController.getAllPayments);
restaurantRouter.get('/getAllPaymentsFs',paymentController.getAllPayments_fs);

module.exports = restaurantRouter;
