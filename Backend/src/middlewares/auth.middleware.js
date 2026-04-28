import JWT from 'jsonwebtoken'
import { config } from '../config/config.js';
import userModel from '../models/user.model.js';

export const authenticateSeller = async (req, res, next ) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = JWT.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decodedToken.id);
        if(!user){
            return res.status(400).json({ message: "Unauthorized" })
        }
        if( user.role !== "seller"){
            return res.status(403).json({ message: "Forbidden" })
        }
        req.user = user;    
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export const authenticateUser = async ( req, res, next) => {
    const token  = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
        const decode = JWT.verify(token, config.JWT_SECRET );
        const user = await userModel.findById(decode.id);

        if(!user){
            return res.status(404).json({
                message:"Unauthorized"
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:" Unauthorized "
        })
        
    }
}
