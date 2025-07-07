import { Router  }from "express";
import  authorize  from "../middleware/auth.middleware.js" ;
import { createSubscription, gerUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => res.send({ title: "Get all subscriptions" }));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: "Get subscription details" }));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({ title: "Update subscriptions" }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: "Delete subscriptions" }));

subscriptionRouter.get('/user/:id', authorize, gerUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: "Cancel subscriptions" }));

subscriptionRouter.get('/upcomming-renewals', (req, res) => res.send({ title: "Get Upcomming subscriptions" }));


export default subscriptionRouter;