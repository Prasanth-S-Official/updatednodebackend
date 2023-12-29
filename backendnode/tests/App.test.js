const fs = require('fs');
const path = require('path');
const {
  register_fs,
  login_fs,
  getAllUsers_fs,
  resetPassword_fs,
} = require('../controller/users'); // Replace 'userController' with the actual filename where your code is located




  
  describe('User Controller - File System', () => {
    test('Register a new user', async () => {
      const req = {
        body: {
          name: 'TestUser',
          email: 'test@example.com',
          phoneNo: '1234567890',
          password: 'testpassword',
          role: 'user',
          id: '123',
        },
      };
  
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      // Run the register_fs function
      await register_fs(req, res);
  
      // Check if the user is registered and file is created
      expect(usersData.length).toBe(1);
      expect(fs.existsSync(dataFilePath)).toBe(true);
  
      // Check the response sent by the controller
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: 'User Registration Successful',
        data: null,
      });
    });
  
    // Write similar tests for login_fs, getAllUsers_fs, and resetPassword_fs functions
    // Make sure to mock the request and response objects appropriately for each test
  });


