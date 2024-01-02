
const { addMenuItem, editMenuItem, getAllMenuItems } = require("../controller/menu");
const { createOrder,reviewOrder } = require("../controller/order");
const { getAllPayments,makePayment } = require("../controller/payment");
const { addRatings, getAllRatings } = require("../controller/ratings");
const menu = require("../models/menu");
const order = require("../models/order");
const paymentModel = require("../models/payment");
const ratingModel = require("../models/rating")
const tableModel = require("../models/table")
const userModel = require("../models/users")

describe("Week8 day4",()=>{
  describe('addRatings Controller', () => {
    test('week8_day_4_should_add_ratings_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          customerId: 1,
          email: 'john@example.com',
          rating: 5,
          feedback: 'Great service!',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the ratingModel.insertMany method to resolve successfully
      ratingModel.insertMany = jest.fn().mockResolvedValue([{ _id: 'sampleRatingId' }]);
  
      // Call the controller function
      await addRatings(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'rating has been received successfully',
        data: null,
      });
    });
  
    test('week8_day_4_add_ratings_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          // Missing required fields
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const error = new Error('Database error');
      ratingModel.insertMany = jest.fn().mockRejectedValue(error);
      // Call the controller function
      await addRatings(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request'
      });
    });
  });
})

describe("Week8 day5",()=>{
  describe('addMenuItem Controller', () => {
    test('week8_day5_should_add_menu_item_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          name: 'SampleItem',
          category: 'Main Course',
          subCategory: 'Vegetarian',
          description: 'A delicious sample item',
          imgPath: '/images/sample.jpg',
          status: 'Available',
          price: 10.99,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock themenu.insertMany method to resolve successfully
      menu.insertMany = jest.fn().mockResolvedValue([{ _id: 'sampleItemId' }]);
  
      // Call the controller function
      await addMenuItem(req, res);
  
      // Assertions
   
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'menu item has been added successfully',
        data:null,
      });
    });
    test('week8_day5_should_add_menu_item_with_a_exact_response_object', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          name: 'SampleItem',
          category: 'Main Course',
          subCategory: 'Vegetarian',
          description: 'A delicious sample item',
          imgPath: '/images/sample.jpg',
          status: 'Available',
          price: 10.99,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock themenu.insertMany method to resolve successfully
      menu.insertMany = jest.fn().mockResolvedValue([{ _id: 'sampleItemId' }]);
  
      // Call the controller function
      await addMenuItem(req, res);
  
      // Assertions
  
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'menu item has been added successfully',
        data:null,
      });
    });
    test('week8_day5_add_menu_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          name: 'SampleItem',
          category: 'Main Course',
          status: 'Available',
          price: 10.99,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock themenu.insertMany method to reject with an error
      const error = new Error('Database error');
      menu.insertMany = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await addMenuItem(req, res);
  
      // Assertions
    
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request',
      });
    });


  });
  describe('editMenuItem Controller', () => {
    test('week8_day5_edit_menu_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {
        params: { _id: 'sampleItemId' },
        body: {
          name: 'UpdatedItem',
          category: 'Main Course',
          status: 'Updated',
          price: 15.99,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock themenu.findOne method to reject with an error
      const error = new Error('Database error');
      menu.findOne = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await editMenuItem(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request',
      });
    });
  });
  
  
  describe('getAllMenuItems Controller', () => {
    test('week8_day5_should_return_all_menu_items_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the menuModel.find method to resolve with sample menu items
      const sampleMenuItems = [
        {
          _id: 'menuItem1',
          name: 'SampleItem1',
          category: 'Main Course',
          subCategory: 'Vegetarian',
          description: 'A delicious sample item 1',
          imgPath: '/images/sample1.jpg',
          status: 'Available',
          price: 10.99,
        },
        {
          _id: 'menuItem2',
          name: 'SampleItem2',
          category: 'Dessert',
          subCategory: 'Chocolate',
          description: 'A delicious sample item 2',
          imgPath: '/images/sample2.jpg',
          status: 'Available',
          price: 8.99,
        },
      ];
  
      menu.find = jest.fn().mockResolvedValue(sampleMenuItems);
  
      // Call the controller function
      await getAllMenuItems(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
  
    });
  
    test('week8_day5_get_all_menu_item_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the menuModel.find method to reject with an error
      const error = new Error('Database error');
      menu.find = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await getAllMenuItems(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request',
      });
    });
  });

  describe('getAllRatings Controller', () => {
    test('week8_day_5_should_return_all_ratings_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the ratingModel.find method to resolve with sample rating data
      const sampleRatings = [
        {
          _id: 'ratingId1',
          customerId: 1,
          email: 'john@example.com',
          rating: 5,
          feedback: 'Great service!',
        },
        // Add more sample ratings as needed
      ];
      ratingModel.find = jest.fn().mockResolvedValue(sampleRatings);
  
      // Call the controller function
      await getAllRatings(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'All rating details',
        data: sampleRatings,
      });
    });
  
    test('week8_day_5_get_all_ratings_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the ratingModel.find method to reject with an error
      const error = new Error('Database error');
      ratingModel.find = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await getAllRatings(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request'
      });
    });
  });
  
})
  

describe('Week9 day1', () => {
  describe('createOrder', () => {
    test('week9_day1_should_place_order_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          menuItems: ['item1', 'item2'],
          customerId: 'customerId',
          description: 'Order description',
          totalPrice: 50.99,
          tableNo: 'Table 1',
          status: 'Pending',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Mock the order.insertMany method to resolve successfully
      order.insertMany = jest.fn().mockResolvedValue([{ _id: 'orderId' }]);

      // Call the controller function
      await  createOrder(req, res);

  
      expect(res.status).toHaveBeenCalledWith(200);
      
    });
  });

  describe('reviewOrder', () => {
    test('week9_day1_should_return_order_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        params: {
          customerId: 'customerId',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),

      };

      // Mock the order.findOne method to resolve with a sample order
      const sampleOrder = {
        _id: 'orderId',
        menuItems: ['item1', 'item2'],
        customerId: 'customerId',
        description: 'Order description',
        totalPrice: 50.99,
        tableNo: 'Table 1',
        status: 'Pending',
      };
      order.findOne = jest.fn().mockResolvedValue(sampleOrder);

      // Call the controller function
      await reviewOrder(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'order found successfully',
        data: sampleOrder,
      });
    });
    test('week9_day1_should_return_order_not_found_with_a_404_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        params: {
          customerId: 'nonExistentCustomerId',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),

      };

      // Mock the order.findOne method to resolve with null (order not found)
      order.findOne = jest.fn().mockResolvedValue(null);

      // Call the controller function
      await reviewOrder(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'order not found',
      });
    });
  });
});

describe("Week9 day3",()=>{
  describe('makePayment Controller', () => {
    test('week9_day3_should_make_payment_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          paymentMode: 'Credit Card',
          orderId: 1,
          customerId: 2,
          email: 'john@example.com',
          phNo: '1234567890',
          customerName: 'John Doe',
          paymentDesc: 'Payment for order #123',
          totalPrice: 100.50,
          status: 'Success',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the paymentModel.insertMany method to resolve successfully
      paymentModel.insertMany = jest.fn().mockResolvedValue([{ _id: 'samplePaymentId' }]);
  
      // Call the controller function
      await makePayment(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'payment has been made successfully',
        data: null,
      });
    });
  
    test('week9_day3_make_payment_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {
        body: {
          // Missing required fields
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
          // Mock the paymentModel.find method to reject with an error
          const error = new Error('Database error');
          paymentModel.insertMany = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await makePayment(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request',
      });
    });
  });
  
  describe('getAllPayments Controller', () => {
    test('week9_day3_should_return_all_payments_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the paymentModel.find method to resolve with sample payment data
      const samplePayments = [
        {
          _id: 'paymentId1',
          paymentMode: 'Credit Card',
          orderId: 1,
          customerId: 2,
          email: 'john@example.com',
          phNo: '1234567890',
          customerName: 'John Doe',
          paymentDesc: 'Payment for order #123',
          totalPrice: 100.50,
          status: 'Success',
        },
        // Add more sample payments as needed
      ];
      paymentModel.find = jest.fn().mockResolvedValue(samplePayments);
  
      // Call the controller function
      await getAllPayments(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'all payment detail',
        data: samplePayments,
      });
    });
  
    test('week9_day3_get_all_payment_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
      // Mock Express request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Mock the paymentModel.find method to reject with an error
      const error = new Error('Database error');
      paymentModel.find = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await getAllPayments(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'Bad request',
      });
    });
  });
})





