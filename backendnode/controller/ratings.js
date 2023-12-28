const ratingModel = require('../models/rating');

//adding feedback and rating from customer
const addRatings= async (req,res,next)=>{
    try{
        let{customerId,email,rating,feedback}=req.body
        await ratingModel.insertMany([{
            customerId,
            email,
            rating,
            feedback
        }])
        res.json({
            error:false,
            message:"rating has been received successfully",
            data:null
        })
    }catch(err){
        next(err)
    }
}


module.exports = {
    addRatings
}