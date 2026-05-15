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


export const setProductVariant = async ( req, res ) => {
    const productId = req.params.productId
    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    });
    if(!product){
        return res.status(401).json({
            message:"Product not found"
        })
    }
    const files = req.files;
    const images = [];

    if(files && files.length > 0 ){
        ( await Promise.all(files.map(async ( file) => {
            const image = await uploadFiles({
                buffer: file.buffer,
                fileName: file.originalname
            });
            return image
        }))).map( image  => images.push(image))
    }

    const priceAmount = req.body.priceAmount
    const priceCurrency = req.body.priceCurrency
    const stock = req.body.stock
    const attributes =  JSON.parse(req.body.attributes ||  "{}" );
    
    // Validate required fields
    if (!priceAmount && priceAmount !== 0) {
        return res.status(400).json({
            message: "Price amount is required"
        });
    }

    const variantPrice = Number(priceAmount);
    if (isNaN(variantPrice)) {
        return res.status(400).json({
            message: "Price amount must be a valid number"
        });
    }


    product.variants.push({
        price: {
            amount: variantPrice,
            currency: priceCurrency || product.price.priceCurrency
        },
        stock: Number(stock) || 0,
        images,
        attributes
    })  

    await product.save()

    return res.status(201).json({
        message:"Product Variant added successfully",
        success: true,
        product
    });

} 