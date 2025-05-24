import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

// Your schema definitions here...



const url= new Schema({
    fullUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
        default:()=>nanoid().substring(0,6)
    },
    clicks:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
})

const urlSchema = mongoose.model("short-url",url)

export {
    urlSchema
}