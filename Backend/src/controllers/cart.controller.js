import { stockOfVariant } from "../dao/stock.dao.js";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";    
import mongoose from "mongoose";
import { createOrder } from "../services/payment.service.js";
import { getCartDetails }  from "../dao/getCartDetail.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js'
import { config } from "../config/config.js";

export const addToCart = async ( req, res ) => {

    try {
    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const quantity = req.body.quantity || 1;

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    });
    if(!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    const stock = await stockOfVariant(productId, variantId);

    const cart = ( await cartModel.findOne({ user: req.user._id })) || 
    ( await cartModel.create({ user: req.user._id }));

    const isAlreadyInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId);

    if(isAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId).quantity;
        if( quantityInCart + quantity > stock ) {
            return res.status(400).json({ 
                message:`Only ${ stock } items left in stock , you have already added ${ quantityInCart } items to your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )   

        return res.status(200).json({ message: "Cart updated successfully",
            success: true
         });
    } 

    if( quantity > stock ) {
        return res.status(400).json({ 
            message:`Only ${ stock } items left in stock , you have already added ${ quantity } items to your cart`,
            success: false
        })
    }

    cart.items.push({  
        product: productId,
        variant: variantId,
        quantity,
        price: product.variants.find(variant => variant._id.toString() === variantId).price
    })

    await cart.save();
    
    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
     })
    } catch (error) {
        console.error("Error occurred while adding to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getCart = async ( req, res ) => {
    const user = req.user

    let cart = await getCartDetails(user._id);
    
    if(!cart) {
        cart = await cartModel.create({ user: user._id });
    }
    return res.status(200).json({      
        message: "Cart retrieved successfully",
        success: true,
        cart
     });
}

export const incrementCartItem = async ( req, res ) => {
 const { productId, variantId } = req.params;

 const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId
});
if(!product) {
    return res.status(404).json({
         message: "Product not found"
   })   
}

const cart = await cartModel.findOne({ user: req.user._id });   

if(!cart) {
    return res.status(404).json({
         message: "Cart not found"
   })   
}   

const stock = await stockOfVariant(productId, variantId);
const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId)?.quantity || 0;

if( itemQuantityInCart + 1 > stock ) {
    return res.status(400).json({ 
        message:`Only ${ stock } items left in stock , you have already added ${ itemQuantityInCart } items to your cart`
    })  
}

await cartModel.findOneAndUpdate(
    { user: req.user._id, "items.product": productId, "items.variant": variantId },
    { $inc: { "items.$.quantity": 1 } },
    { new: true }
)   
return res.status(200).json({   
    message: "Cart item quantity incremented successfully",
    success: true
})

}


export const decrementCartItem = async ( req, res ) => {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({    
        _id: productId,
        "variants._id": variantId
    });
    if(!product) {
        return res.status(404).json({
             message: "Product not found"
       })   
    }

    const cart = await cartModel.findOne({ user: req.user._id });

    if(!cart) {
        return res.status(404).json({
             message: "Cart not found"
       })   
    }

    const stock = await stockOfVariant(productId, variantId);
    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId)?.quantity || 0;

    if( itemQuantityInCart - 1 < 0 ) {
        return res.status(400).json({ 
            message:`You have only ${ itemQuantityInCart } items in your cart`
        })  
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
    );

    return res.status(200).json({
        message: "Cart item quantity decremented successfully",
        success: true
    });

}

export const removeCartItem = async ( req, res ) => {
    const { productId, variantId } = req.params;    
    const cart = await cartModel.findOne({ user: req.user._id });

    if(!cart) {
        return res.status(404).json({
                message: "Cart not found"
        })   
    }
    await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { items: { product: productId, variant: variantId } } },
        { new: true }
    );
    return res.status(200).json({
        message: "Cart item removed successfully",
        success: true
    });
}

export const createOrderController = async ( req, res ) => {
    
    const cart = await getCartDetails(req.user._id);
    
    if(!cart || cart.items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty",
            success: false
        })
    }

    const order = await createOrder({ amount: cart.totalPrice, currency: cart.currency });

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price:{
            amount: cart.totalPrice,
            currency: cart.currency
        },
        orderItems : cart.items.map(item => ({  
            title: item.product.title,
            productId: item.product._id,  
            variantId: item.variant,
            quantity: item.quantity,
            images: item.product.variants.images || item.product.images,
            price: {
                amount: item.product.variants.price.amount || item.product.price.amount,
                currency: item.product.variants.price.currency || item.product.price.currency 
            },
            description: item.product.description
        }))
    })

    return res.status(200).json({
        message: "Order created successfully",
        success: true,
        order
    });
}


export const verifyPaymentController = async ( req, res ) => {
    const { razorpay_order_id ,razorpay_payment_id, razorpay_signature } = req.body;

    const paymentRecord = await paymentModel.findOne({ 
        "razorpay.orderId": razorpay_order_id,
        status: "pending"
     });

     if(!paymentRecord) {
        return res.status(404).json({
            message: "Payment record not found",
            success: false
        })
     }

     const isPaymentValid = validatePaymentVerification({ 
        order_id: razorpay_order_id, 
        payment_id: razorpay_payment_id
     }, razorpay_signature, config.RAZORPAY_KEY_SECRET)

     if(!isPaymentValid) {
        paymentRecord.status = "failed";
        await paymentRecord.save();
        return res.status(400).json({
            message: "Payment verification failed",
            success: false
        })
     }

     paymentRecord.status = "completed";
     paymentRecord.razorpay.paymentId = razorpay_payment_id;
     paymentRecord.razorpay.signature = razorpay_signature;

     await paymentRecord.save();

     return res.status(200).json({
        message: "Payment verified successfully",
        success: true
     })
} 