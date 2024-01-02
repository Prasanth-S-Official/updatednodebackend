// const fs = require('fs');
// const path = require('path');
// const {
//   register_fs,
//   login_fs,
//   getAllUsers_fs,
//   resetPassword_fs,
// } = require('../controller/users'); // Replace 'userController' with the actual filename where your code is located
// const { readDataAndPrint, writeDataToFile, addData, displayData,callbackFunction } = require('../Week7Day1&2');

const { addMenuItem } = require("../controller/menu");

// const {writeDataToFileUsingfileSystem,readDataAndPrintUsingfileSystem}=require('../Week7day3');
// const { makePayment_fs, getAllPayments_fs, getPaymentById_fs, deletePaymentById_fs } = require('../controller/payment');


// describe('Week7', () => {
//   test('week7_day1_add_data_should_be_defined', () => {
//     expect(addData).toBeDefined();
//     expect(typeof addData).toBe('function');
//   });

//   test('week7_day1_display_data_should_be_defined', () => {
//     expect(displayData).toBeDefined();
//     expect(typeof displayData).toBe('function');
//   });
//   test('week7_day1_callback_should_be_defined', () => {
//     expect(callbackFunction).toBeDefined();
//     expect(typeof callbackFunction).toBe('function');
//   });
//   test('week7_day2_write_data_to_file_should_be_defined', () => {
//     expect(writeDataToFile).toBeDefined();
//     expect(typeof writeDataToFile).toBe('function');
//   });

//   test('week7_day2_read_data_and_print_should_be_defined', () => {
//     expect(readDataAndPrint).toBeDefined();
//     expect(typeof readDataAndPrint).toBe('function');
//   });
//   test('week7_day3_read_data_and_print_using_file_system_should_be_defined', () => {
//     expect(readDataAndPrintUsingfileSystem).toBeDefined();
//     expect(typeof readDataAndPrintUsingfileSystem).toBe('function');
//   });

//   test('week7_day3_write_data_to_file_using_file_system_should_be_defined', () => {
//     expect(writeDataToFileUsingfileSystem).toBeDefined();
//     expect(typeof writeDataToFileUsingfileSystem).toBe('function');
//   });
//     test('week7_day4_register_fs_function_should_be_defined', () => {
//       expect(register_fs).toBeDefined();
//       expect(typeof register_fs).toBe('function');
//     });
  
//     test('week7_day4_login_fs_function_should_be_defined', () => {
//       expect(login_fs).toBeDefined();
//       expect(typeof login_fs).toBe('function');
//     });
  
//     test('week7_day5_reset_password_fs_function_should_be_defined', () => {
//       expect(resetPassword_fs).toBeDefined();
//       expect(typeof resetPassword_fs).toBe('function');
//     });
  
//     test('week7_day5_get_all_users_fs_function_should_be_defined', () => {
//       expect(getAllUsers_fs).toBeDefined();
//       expect(typeof getAllUsers_fs).toBe('function');
//     });
// });
// ``

// describe('Week8', () => {
//   test('week8_day1_make_payment_fs_should_be_defined', () => {
//     expect(makePayment_fs).toBeDefined();
//     expect(typeof makePayment_fs).toBe('function');
//   });

//   test('week8_day1_get_all_payments_fs_should_be_defined', () => {
//     expect(getAllPayments_fs).toBeDefined();
//     expect(typeof getAllPayments_fs).toBe('function');
//   });

//   test('week8_day2_get_payment_by_id_fs_should_be_defined', () => {
//     expect(getPaymentById_fs).toBeDefined();
//     expect(typeof getPaymentById_fs).toBe('function');
//   });

//   test('week8_day2_delete_payment_by_id_fs_should_be_defined', () => {
//     expect(deletePaymentById_fs).toBeDefined();
//     expect(typeof deletePaymentById_fs).toBe('function');
//   });
// });


  

describe('addMenuItem Controller', () => {
  test('should_add_menu_item_with_a_200_status_code', async () => {
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

    // Mock the menuModel.insertMany method to resolve successfully
    menuModel.insertMany = jest.fn().mockResolvedValue([{ _id: 'sampleItemId' }]);

    // Call the controller function
    await addMenuItem(req, res);

    // Assertions
    expect(menuModel.insertMany).toHaveBeenCalledWith([{
      name: 'SampleItem',
      category: 'Main Course',
      subCategory: 'Vegetarian',
      description: 'A delicious sample item',
      imgPath: '/images/sample.jpg',
      status: 'Available',
      price: 10.99,
    }]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'menu item has been added successfully',
      data: { _id: 'sampleItemId' },
    });
  });

  test('should_handle_invalid_menu_data_and_respond_with_a_400_status_code', async () => {
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

    // Call the controller function
    await addMenuItem(req, res);

    // Assertions
    expect(menuModel.insertMany).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'please enter proper menu detail',
      data: null,
    });
  });

  test('should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
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

    // Mock the menuModel.insertMany method to reject with an error
    const error = new Error('Database error');
    menuModel.insertMany = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await addMenuItem(req, res);

    // Assertions
    expect(menuModel.insertMany).toHaveBeenCalledWith([{
      name: 'SampleItem',
      category: 'Main Course',
      status: 'Available',
      price: 10.99,
    }]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Bad request',
    });
  });
});
