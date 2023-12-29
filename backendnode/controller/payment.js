

const fs = require('fs');

const paymentModel = require('../models/payment');

//making a payment against an order
const makePayment = async (req, res, next) => {
    try {
      let { paymentMode,orderId,customerId,email,customerName,paymentDesc,phNo,totalPrice,status } = req.body;
        await paymentModel.insertMany([
        {
            paymentMode,
            orderId,
            customerId,
            email,
            phNo,
            customerName,
            paymentDesc,
            totalPrice,
            status
        },
      ]);
      res.json({
        error: false,
        message: "payment has been made successfully",
        data: null,
      }); 
   
    } catch (err) {
      next(err);
    }
  };

  //Getting all payment details

  const getAllPayments= async (req,res,next)=>{
    try{
       const payments= await paymentModel.find().lean();
       res.json({
           error:false,
           message:"all payment detail",
           data:payments
       })
    }catch(err){
        next(err)
    }
}




//--------------------------//

let paymentsData = [];

// Read data from the JSON file if it exists
const dataFilePath = 'paymentsData.json';
if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  paymentsData = JSON.parse(rawData);
}


async function makePayment_fs(req, res){
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
}
async function getAllPayments_fs(req, res) {
  try {
    res.json(paymentsData);
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ error: 'Error getting payments' });
  }
}

  module.exports = {
    makePayment,
    getAllPayments,
    getAllPayments_fs,
    makePayment_fs
  }