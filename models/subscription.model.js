import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Subscription name is Required"],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    price:{
        type:Number,
        required:[true, "Subscription Price is Required"],
        min:[0, "Price must be greater than 0"]
    },
    currency:{
        type:String,
        enum:["USD","EUR","IND"],
        default:"IND"
    },
    freequency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"],
    },
    category:{
        type:String,
        enum:['sports', 'entertainment', 'education', 'health', 'technology', 'finance', 'politics', 'others'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["active", "cancelled", "expired"],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value) => value <= new Date(),
            message: "Start date must be in the past"
         }
    },
     renewalDate:{
        type:Date,
        required:false,
        validate:{
            validator:function (value) { return value > this.startDate },
            message: "Renewal date must be after the start date",
         }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    }
},{timestamps:true});

// auto renewal date if missing
subscriptionSchema.pre('save', function(next){
        if(!this.renewalDate){
            const renewalPeriods ={
                daily:1,
                weekly:7,
                monthly:30,
                yearly:365
            };
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.freequency]);
        }
        if(this.renewalDate< new Date()){
            this.status = "expired";
        }
        next();
});

const subscriptionModel =mongoose.model("Subscription", subscriptionSchema);

export default subscriptionModel;