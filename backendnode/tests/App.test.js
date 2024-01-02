const fs = require('fs');
const path = require('path');
const {
  register_fs,
  login_fs,
  getAllUsers_fs,
  resetPassword_fs,
} = require('../controller/users'); // Replace 'userController' with the actual filename where your code is located
const { readDataAndPrint, writeDataToFile, addData, displayData } = require('../Week7Day1&2');

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


describe('Module Functions', () => {
  test('writeDataToFile function should be defined', () => {
    expect(writeDataToFile).toBeDefined();
    expect(typeof writeDataToFile).toBe('function');
  });

  test('readDataAndPrint function should be defined', () => {
    expect(readDataAndPrint).toBeDefined();
    expect(typeof readDataAndPrint).toBe('function');
  });

  test('addData function should be defined', () => {
    expect(addData).toBeDefined();
    expect(typeof addData).toBe('function');
  });

  test('displayData function should be defined', () => {
    expect(displayData).toBeDefined();
    expect(typeof displayData).toBe('function');
  });
  test('readDataAndPrintUsingfileSystem function should be defined', () => {
    expect(readDataAndPrintUsingfileSystem).toBeDefined();
    expect(typeof readDataAndPrintUsingfileSystem).toBe('function');
  });

  test('writeDataToFileUsingfileSystem function should be defined', () => {
    expect(writeDataToFileUsingfileSystem).toBeDefined();
    expect(typeof writeDataToFileUsingfileSystem).toBe('function');
  });
});




  


