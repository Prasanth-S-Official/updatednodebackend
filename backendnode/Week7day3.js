const paymentsData = [
    {
      paymentMode: 'Credit Card',
      orderId: 1, // Replace with a valid order ID
      customerId: 2, // Replace with a valid user ID
      email: 'john@example.com',
      customerName: 'John Doe',
      paymentDesc: 'Payment for order #123',
      phNo: '1234567890',
      totalPrice: 100.50,
      status: 'Success',
    },
    {
      paymentMode: 'PayPal',
      orderId: 2, // Replace with a valid order ID
      customerId: 2, // Replace with a valid user ID
      email: 'alice@example.com',
      customerName: 'Alice Smith',
      paymentDesc: 'Payment for order #456',
      phNo: '9876543210',
      totalPrice: 75.25,
      status: 'Pending',
    },
  ];
  
  
const writeDataToFile = () => {
    const writeStream = fs.createWriteStream('userData.json');
  
    writeStream.write('[');
    dataArray.forEach((user, index) => {
      const comma = index === 0 ? '' : ',';
      writeStream.write(`${comma}\n${JSON.stringify(user)}`);
    });
    writeStream.write('\n]');
    writeStream.end();
  
    console.log('Data has been written to userData.json using streams');
  };
const readDataAndPrint = () => {
    const readStream = fs.createReadStream('userData.json', 'utf8');
  
    let fileData = '';
    readStream.on('data', (chunk) => {
      fileData += chunk;
    });
  
    readStream.on('end', () => {
      const readData = JSON.parse(fileData);
  
      console.log('Read data from userData.json using streams:');
      readData.forEach((user, index) => {
        console.log(`${index + 1}. ${JSON.stringify(user)}`);
      });
    });
  
    readStream.on('error', (error) => {
      console.error('Error reading file:', error.message);
    });
  };
  