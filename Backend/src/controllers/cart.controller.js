import { stockOfVariant } from "../dao/stock.dao.js";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";    
import mongoose from "mongoose";


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

    let cart = (await cartModel.aggregate(
          [
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id)
      }
    },
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $unwind: { path: '$items.product.variants' }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$items.variant',
            '$items.product.variants._id'
          ]
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              '$items.quantity',
              '$items.product.variants.price.amount'
            ]
          },
          currency:
            '$items.product.variants.price.currency'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalPrice: { $sum: '$itemPrice.price' },
        currency: {
          $first: '$itemsPrice.currency'
        },
        items: { $push: '$items' }
      }
    }
  ])) [0];

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