import mongoose from 'mongoose';
import { DB_URL, NODE_ENV } from '../config/env.js';

if(!DB_URL){
    throw new Error('DB_URL is not defined in environment variables inside .env.<development/production>.local file');
}

const connectToDB = async ()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log(`Connected to the database successfully in ${NODE_ENV} mode`);
    } 
    catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with failure
    }
} 

export default connectToDB;