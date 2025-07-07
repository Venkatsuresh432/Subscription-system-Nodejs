import { Router } from 'express';
import { getUsers, getUser } from "../controllers/user.controller.js";
import  authorize  from "../middleware/auth.middleware.js" ;
import errorMiddleware  from "../middleware/auth.middleware.js";

const userRouter = Router();


userRouter.get('/', authorize,  getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req, res)=> res.send({title: "create new user"}));

userRouter.put('/:id', (req, res)=> res.send({title: "Update users"}));

userRouter.delete('/:id', (req, res)=> res.send({title: "Delete user"}));

export default userRouter;
