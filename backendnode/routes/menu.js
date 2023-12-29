const express=require('express');
const menuRouter=express.Router();

const menuController = require('../controller/menu');
const tableController = require('../controller/table');
const userController = require('../controller/users');
const paymentController = require('../controller/payment');


//Adding a menu item
menuRouter.post('/addMenu',menuController.addMenuItem);
//Editing menu items
menuRouter.put('/editMenu/:_id',menuController.editMenuItem);
//Getting all menu items
menuRouter.get('/getAllMenu',menuController.getAllMenuItems);


//Adding a table
menuRouter.post('/addTable',tableController.addTable);
//Getting table status
menuRouter.get('/table',tableController.getTableStatus);
//editing the table status
menuRouter.put('/table/editStatus',tableController.editTableStatus);

//Getting all users accounts
menuRouter.get('/getAllUsers',userController.getAllUsers);

//Getting all payment details
menuRouter.get('/getAllPayments',paymentController.getAllPayments);

module.exports = menuRouter;
