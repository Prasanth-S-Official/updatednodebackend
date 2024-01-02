const fs = require('fs');
const path = require('path');
const {
  register_fs,
  login_fs,
  getAllUsers_fs,
  resetPassword_fs,
} = require('../controller/users'); // Replace 'userController' with the actual filename where your code is located
const { readDataAndPrint, writeDataToFile, addData, displayData,callbackFunction } = require('../Week7Day1&2');

const {writeDataToFileUsingfileSystem,readDataAndPrintUsingfileSystem}=require('../Week7day3')


  
  describe('User Controller - File System', () => {
    const testUniqueId = new Date().getTime(); // Generate a unique timestamp for each test run
    const uniqueEmail = `test${testUniqueId}@example.com`;

    test(`Register a new user with a unique email (${testUniqueId})`, async () => {
    
      const req = {
        body: {
          name: 'TestUser',
          email: uniqueEmail,
          phoneNo: '1234567890',
          password: 'testpassword',
          role: 'user',
          id: testUniqueId,
        },
      };
    
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
    
      // Run the register_fs function
      await register_fs(req, res);
    
      // Check the response sent by the controller
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'User Registration Successful',
        data: null,
      });
    });
    
    // Write similar tests for login_fs, getAllUsers_fs, and resetPassword_fs functions
    // Make sure to mock the request and response objects appropriately for each test
    test('User successfully logs in with correct email and password', async () => {


        const req = {
          body: {
            email: uniqueEmail,
            password: 'testpassword',
          },
        };
      
        const res = {
          json: jest.fn(),
        };
      
        await login_fs(req, res);
      
        expect(res.json).toHaveBeenCalledWith({
          error: false,
          message: 'Login Successfully',
          role:"user",
          email: uniqueEmail,
          name: 'TestUser'
        });
      });
});


describe('Week7', () => {
  test('week7_day1_add_data_should_be_defined', () => {
    expect(addData).toBeDefined();
    expect(typeof addData).toBe('function');
  });

  test('week7_day1_display_data_should_be_defined', () => {
    expect(displayData).toBeDefined();
    expect(typeof displayData).toBe('function');
  });
  test('week7_day1_callback_should_be_defined', () => {
    expect(callbackFunction).toBeDefined();
    expect(typeof callbackFunction).toBe('function');
  });
  test('week7_day2_write_data_to_file_should_be_defined', () => {
    expect(writeDataToFile).toBeDefined();
    expect(typeof writeDataToFile).toBe('function');
  });

  test('week7_day2_read_data_and_print_should_be_defined', () => {
    expect(readDataAndPrint).toBeDefined();
    expect(typeof readDataAndPrint).toBe('function');
  });
  test('week7_day3_read_data_and_print_using_file_system_should_be_defined', () => {
    expect(readDataAndPrintUsingfileSystem).toBeDefined();
    expect(typeof readDataAndPrintUsingfileSystem).toBe('function');
  });

  test('week7_day3_write_data_to_file_using_file_system_should_be_defined', () => {
    expect(writeDataToFileUsingfileSystem).toBeDefined();
    expect(typeof writeDataToFileUsingfileSystem).toBe('function');
  });

  
});




  


