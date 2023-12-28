const mongoose=require('mongoose')
const Schema=mongoose.Schema

const cartSchema=new Schema(
    {
        menuItems:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Menu'
            },
        ],
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        },
        customerName:{
            type:String,
        },

        description:{
            type:String,
        },
        totalPrice:{
            type:Number,
        }
    }
)

module.exports=mongoose.model('cart',cartSchema);