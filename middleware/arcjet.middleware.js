import aj from "../config/arcjet.config.js";


const arcjetMiddleware  = async ( req, res, next ) =>{

   const userAgent = req.headers['user-agent'] || '';


  if (userAgent.includes("Postman")) {
    console.log("Bypassing Arcjet for Postman");
    return next();
  }

    try {
        const decision =await aj.protect(req, { requested: 1});

        if(decision.isDenied()){
          if(decision.reason?.isRateLimited) return res.status(429).json({ message:"Rate limit exceeded" });
          if(decision.reason.isBot()) return res.status(403).json({ message:"Access denied for bots" }); 
          return res.status(403).json({ message:"Access denied" });
        }
        next();
    } 
    catch (error) {
        console.log("Arcjet Middleware Error:", error);
        next(error);
    }
}

export default arcjetMiddleware;