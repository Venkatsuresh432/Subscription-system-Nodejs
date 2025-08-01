const errorMiddleware = (err, req, res, next )=> {
    try {
       let error  = { ...err};
       error.message = err.message;
       console.error(err);
       //mongoose bad ObjectId
       if( err.name === "CastError"){
        const message = " Resource not found";
        error = new Error(message);
        error.statusCode = 404;
       } 
       // mongoose duplicate key error
       if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new Error(message);
        error.statusCode = 400;
       }
       // mongoose validation error
       if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new Error(message.join(', '));
        error.statusCode = 400;      
     }
     res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : error.stack
     });
    } 
    catch (error) {
        next(error);
    }
}

export default errorMiddleware;