import productModel from "../models/product.model.js";
import { uploadFiles } from "../services/storage.services.js";


export const createProduct = async (req, res) => {
    const { title , description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map( async (file) => {
        return await uploadFiles({
                buffer: file.buffer,
                fileName: file.originalname
            })
    }))

    const product = await productModel.create({
        title,
        description,
        seller: seller.id,
        images,
        price:{
            priceAmount,
            priceCurrency   
        }
    })

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    })

} 

export const getSellerProduct = async ( req, res ) => {
    const seller = req.user
    const products = await productModel.find({seller: seller.id});
    if(!products){
        return res.status(404).json({
            message:'Product not found'
        })
    }

    res.status(201).json({
        message:"Products find Successfully",
        products,
        success: true
    })
} 

export const getAllProducts = async ( req, res ) => {
    const allProducts = await productModel.find();

    return res.status(201).json({
        message:"All products fetched successfully",
        success: true,
        allProducts
    });
} 

export const getProductDetail = async ( req, res ) => {
    const { productId } = req.params
    const product = await productModel.findById(productId)

    if(!product){
        return res.status(401).json({
            message:"Product not found"
        })
    }

    return res.status(201).json({
        message:"Product detailed fetch Successfully",
        success: true,
        product
    })
}