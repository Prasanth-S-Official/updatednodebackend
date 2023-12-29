const {
    writeDataToFile,
    readDataAndPrint,
    addData,
    displayData
  } = require('../Week7Day1&2'); // Replace 'yourFileName' with the actual filename where your code is located
  
  // Test the addData function
  test('Add user data to dataArray', () => {
    const userData = {
      name: 'TestUser',
      email: 'test@example.com',
      phoneNo: '1234567890',
      password: 'testpassword',
      role: 'user',
    };
  
    addData(userData, (err, addedUserData) => {
      expect(err).toBeNull();
      expect(addedUserData).toEqual(userData);
    });
  });
  
  // Test the displayData function
  test('Display users in the array', () => {
    // Mock console.log to capture output
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    displayData();
  
    // Check if console.log was called with the expected output
    expect(mockLog).toHaveBeenCalledWith('Users in the array:');
    // Add more expectations as needed based on your actual implementation
  
    // Restore the original console.log function
    mockLog.mockRestore();
  });