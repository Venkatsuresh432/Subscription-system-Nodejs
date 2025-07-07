import express from 'express';
import { PORT } from "./config/env.js";
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscriotion.routes.js';
import connectToDB from './database/db.js';
import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


const app = express();
// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(arcjetMiddleware);



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);


app.use(errorMiddleware);

 app.get("/", ( req , res ) =>{
    res.send("Hello World!");
 })


 app.listen(PORT,  async ()=>{
    await connectToDB();
    console.log("server is running on port", PORT);
 })

 export default app;