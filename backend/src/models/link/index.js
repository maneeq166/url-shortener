import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    userUrl:{
        type:String
    },
    clicks:{
        type:Number,
        required:true
    },
    expiredDate:{
        type:Date,
    },
    isExpired:{
        type:Boolean,
        required:true
    }

},{timestamps:true})

export const Link = mongoose.model("link",linkSchema);

