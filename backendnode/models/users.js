const mongoose=require('mongoose')
const Schema= mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,      
    },
    
    email:{
        type:String,        
    },
    phoneNo:{
        type:String,
            },
    password:{
        type:String,
        
    },
    role:{
        type:String,
        
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order' 
        }
    ],
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    // hashedOTP: {
    //     type: String,
    //     // required: true,
    //     default:"null"
    //   },
     verified: {
         type:Boolean,
        
      }
})
module.exports=mongoose.model('user',userSchema)