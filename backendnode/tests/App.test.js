
const { addMenuItem, editMenuItem } = require("../controller/menu");
const menu = require("../models/menu");



  

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
  // test('should_handle_invalid_menu_data_and_respond_with_a_400_status_code', async () => {
  //   // Mock Express request and response objects
  //   const req = {
  //     body: {
  //       // Missing required fields
  //     },
  //   };
  //   const res = {
  //     json: jest.fn(),
  //     status: jest.fn().mockReturnThis(),
  //   };

  //   // Call the controller function
  //   await addMenuItem(req, res);

  //   // Assertions
  //   expect(menuModel.insertMany).not.toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     error: true,
  //     message: 'please enter proper menu detail',
  //     data: null,
  //   });
  // });

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
  test('week8_day5_should_edit_menu_item_with_a_200_status_code', async () => {
    // Mock Express request and response objects
    const req = {
      params: { _id: 'sampleItemId' },
      body: {
        name: 'UpdatedItem',
        category: 'Main Course',
        subCategory: 'Vegetarian',
        description: 'An updated sample item',
        imgPath: '/images/updated-sample.jpg',
        status: 'Updated',
        price: 15.99,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Mock themenu.findOne and updateOne methods to resolve successfully
   menu.findOne = jest.fn().mockResolvedValue({
      _id: 'sampleItemId',
      name: 'SampleItem',
      category: 'Main Course',
      subCategory: 'Vegetarian',
      description: 'A delicious sample item',
      imgPath: '/images/sample.jpg',
      status: 'Available',
      price: 10.99,
    });
   menu.updateOne = jest.fn().mockResolvedValue();

    // Call the controller function
    await editMenuItem(req, res);

    // Assertions
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'menu item has been updated successfully',
      data: null,
    });
  });


  test('week8_day5_should_handle_menu_item_not_found_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = {
      params: { _id: 'nonExistentItemId' },
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

    // Mock themenu.findOne method to resolve with null (item not found)
   menu.findOne = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await editMenuItem(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: false,
      message: 'menu item not found',
    });
  });

  // test('week8_day5_should_handle_errors_and_respond_with_a_400_status_code_and_an_error_message', async () => {
  //   // Mock Express request and response objects
  //   const req = {
  //     params: { _id: 'sampleItemId' },
  //     body: {
  //       name: 'UpdatedItem',
  //       category: 'Main Course',
  //       status: 'Updated',
  //       price: 15.99,
  //     },
  //   };
  //   const res = {
  //     json: jest.fn(),
  //     status: jest.fn().mockReturnThis(),
  //   };

  //   // Mock themenu.findOne method to reject with an error
  //   const error = new Error('Database error');
  //   menu.findOne = jest.fn().mockRejectedValue(error);

  //   // Call the controller function
  //   await editMenuItem(req, res);

  //   // Assertions
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.json).toHaveBeenCalledWith({
  //     error: true,
  //     message: 'Bad request',
  //   });
  // });
});