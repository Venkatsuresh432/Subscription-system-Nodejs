import { workflowClient } from '../config/upstash.js';
import subscription from '../models/subscription.model.js'
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res , next) =>{
    try {
        const Subscription = await subscription.create({
            ...req.body,
            user: req.user._id,
        });

       const { workflowRunId }=  await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId: Subscription.id
            },
            headers : {
                'content-type':'Application/json',
            },
            retries : 0,
        })

        res.status(201).json({
            success:true,
            message:"Subscription created successfully",
            data: { Subscription, workflowRunId }
        });

    } 
    catch (error) {
        next(error);
    }
}


export const gerUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of the account');
            error.statusCode = 401;
            throw error;
        }
        const Subscriptions = await subscription.findById({ user:req.params.id});
        res.status(200).json({
            success:true,
            data:Subscriptions
        })
    } 
    catch (error) {
        next(error);
    }
}


