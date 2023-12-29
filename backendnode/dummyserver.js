const dataArray = [];

const addData = (userData, callback) => {
  try {
    dataArray.push(userData);
    if (callback && typeof callback === 'function') {
      callback(null, userData);
    }
  } catch (error) {
    console.error(error);
    console.log('Error adding user.');
    if (callback && typeof callback === 'function') {
      callback(error);
    }
  }
};

const displayData = () => {
  console.log('Users in the array:');
  dataArray.forEach((user, index) => {
    console.log(`${index + 1}. ${JSON.stringify(user)}`);
  });
};

// Callback function to be passed to addData
const callbackFunction = (err, addedUserData) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Callback: User added successfully:', JSON.stringify(addedUserData));
  }
};

// Test the functions with callback
addData({
  name: 'John',
  email: 'john@example.com',
  phoneNo: '1234567890',
  password: 'securepassword',
  role: 'user',
}, callbackFunction);

addData({
  name: 'Alice',
  email: 'alice@example.com',
  phoneNo: '9876543210',
  password: 'anotherpassword',
  role: 'admin',
}, callbackFunction);

displayData();
