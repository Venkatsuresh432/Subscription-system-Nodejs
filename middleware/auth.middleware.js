import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js"


export const authorize  = async (req, res, next) =>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
             token = req.headers.authorization.split(" ")[1];   
        }
        const decoded = await jwt.verify(token, JWT_SECRET);
        if(!decoded){
            const error = new Error("Invalid token");
            error.statusCode = 401; // Unauthorized
            throw error;
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user) return res.status(401).json({ success: false, message: "Unauthorized access"});
        req.user = user;
        next();

    } 
    catch (error) {
       res.status(401).json({
        success:false,
        message:"Unauthorized access",
        error:error.message
       }) 
    }
}

export default authorize;