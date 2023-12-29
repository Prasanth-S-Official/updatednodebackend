const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Array to store payment data
const paymentsData = [
  {
    "paymentMode": "Credit Card",
    "orderId": 1,
    "customerId": 2,
    "email": "john@example.com",
    "customerName": "John Doe",
    "paymentDesc": "Payment for order #123",
    "phNo": "1234567890",
    "totalPrice": 100.5,
    "status": "Success"
  },
  {
    "paymentMode": "PayPal",
    "orderId": 2,
    "customerId": 2,
    "email": "alice@example.com",
    "customerName": "Alice Smith",
    "paymentDesc": "Payment for order #456",
    "phNo": "9876543210",
    "totalPrice": 75.25,
    "status": "Pending"
  }
];

// Endpoint to add a payment
app.post('/api/payments', (req, res) => {
  try {
    const newPayment = req.body;
    paymentsData.push(newPayment);
    res.json({ message: 'Payment added successfully', data: newPayment });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ error: 'Error adding payment' });
  }
});

// Endpoint to get all payments
app.get('/api/payments', (req, res) => {
  try {
    res.json(paymentsData);
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ error: 'Error getting payments' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
