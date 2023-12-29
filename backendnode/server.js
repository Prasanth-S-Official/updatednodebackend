const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

let paymentsData = [];

// Read data from the JSON file if it exists
const dataFilePath = 'paymentsData.json';
if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  paymentsData = JSON.parse(rawData);
}

// Endpoint to add a payment
app.post('/api/payments', (req, res) => {
  try {
    const newPayment = req.body;
    paymentsData.push(newPayment);

    // Save the updated data to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(paymentsData, null, 2));

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
