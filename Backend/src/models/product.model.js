import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        priceAmount:{
            type: Number,
            required:true
        },
        priceCurrency:{
            type: String,
            enum: ["USD", "INR", "JPY", "FUR"],
            default: "INR"
        }
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    images:[
        {
            url:{
                type: String,
                required: true
            }
        }
    ]

});


const productModel = mongoose.model("product", productSchema);
export default productModel