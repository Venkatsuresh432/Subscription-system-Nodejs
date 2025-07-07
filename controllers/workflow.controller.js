import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import dayjs from 'dayjs';

const { serve } = require("@upstash/workflow/express")
import Subscription from '../models/subscription.model.js';
import { sendRemainderEmail } from '../utils/send.email.js';

const REMAINDERS = [7, 5, 2, 1];

export const sendRemainders = serve( async(context)=> {
    const { subscriptionId } = context.requestPayload;
    const subscription = await  fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);
    
    if(renewalDate.isBefore(dayjs())) {
        console.log(`Sending reminder to ${subscription.user.name} for subscription Renewal  ${subscription.name}`);
        return;
    }
    for(const daysBefore of REMAINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isBefore(dayjs())) {
            // 1 days before reminder
            await sleepUntilReminder(context,  `${daysBefore} days before reminder`, reminderDate);
        }
        if(dayjs().isSame(reminderDate, 'day'))
        {
            await triggerReminder(context, `${daysBefore} days before reminder`,subscription);
        }
    }

});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription',    async () => {
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
};


const sleepUntilReminder = async (context, label, date ) =>{
    console.log(`Sleeping until ${label} ${date}`);
    await context.sleepUntil(label, date.toDate());
} 

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async ()=>{
        console.log(`Triggering ${label}`);
        await sendRemainderEmail({
            to:subscription.user.email,
            type: label,
            subscription,
        })
    })
}