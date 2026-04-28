import express from 'express'
import { productValidation } from '../validators/product.validation.js';
import { createProduct, getAllProducts, getSellerProduct } from '../controllers/product.controller.js';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import multer, { memoryStorage } from 'multer'

const postRouter = express.Router();


const upload = multer({ 
    storage: memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024  // 5mb
    }
 });


postRouter.post("/", authenticateSeller, upload.array("images", 7 ), productValidation, createProduct);

postRouter.get("/seller", authenticateSeller, getSellerProduct);

postRouter.get("/allProducts", getAllProducts)


export default postRouter