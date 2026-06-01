import mongoose from "mongoose";
import priceSchema from "./priceSchema.js";


const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    price: {
        type: priceSchema,
        required: true
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String
    },
    orderItems: [{
        title: String,
        productId: mongoose.Schema.Types.ObjectId,
        variantId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: priceSchema,
        description: String,
        images: [ { url: String } ]
    }]


}, { timestamps: true });

const paymentModel = mongoose.model('payment', paymentSchema);

export default  paymentModel;