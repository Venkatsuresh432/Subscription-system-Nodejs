import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_SECRET,JWT_EXPIRATION } from "../config/env.js";


export const signUp = async (req, res, next) => {
    // Extracting user data from the request body
    // Atomic Operation using Mongoose session
    // DB operations that update the state are atomic all or nothing
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const  { name,  email, password } = req.body;

       const existing = await User.findOne({ email });

       if(existing){
        const error = new Error("User already exists with this email");
        error.statusCode = 409; // Conflict
        throw error;
       }
       const salt =await bcrypt.genSaltSync(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUsers = await User.create([{ name, email, password: hashedPassword }],{ session });
       const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET,{ expiresIn: JWT_EXPIRATION } );

       res.status(201).json(
        {
            success:true,
            message:"User created successfully",
            data:{
                token,
                user:newUsers
            }
        })
        
      await session.commitTransaction();  
    } 
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if(!user){
            const error  = new Error("User not found with this email");
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId:user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.status(200).json({
            success:true,
            message:"User signed successfully",
            data:{
                token,
                user
            }
        })
    }
     catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next ) => {}