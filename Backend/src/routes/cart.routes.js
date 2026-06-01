import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateAddToCart, validateCartItems } from '../validators/cart.validator.js';
import { addToCart, getCart, incrementCartItem, decrementCartItem , removeCartItem, createOrderController, verifyPaymentController} from '../controllers/cart.controller.js';


const cartRouter = express.Router();



cartRouter.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart )
cartRouter.get("/", authenticateUser, getCart);

cartRouter.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateCartItems, incrementCartItem )

cartRouter.patch("/quantity/decrement/:productId/:variantId", authenticateUser, validateCartItems, decrementCartItem )

cartRouter.delete("/remove/:productId/:variantId", authenticateUser, validateCartItems, removeCartItem )

cartRouter.post("/payment/create-order", authenticateUser, createOrderController);

cartRouter.post("/payment/order-verify", authenticateUser, verifyPaymentController);

export default cartRouter