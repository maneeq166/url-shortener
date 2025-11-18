 const mongoose = require('mongoose');

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
        default:0,
        required:true
    },
    expiredDate:{
        type:Date,
         default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day later
    },
    isExpired:{
        type:Boolean,
        default:false,
        required:true
    }

},{timestamps:true})

const Link = mongoose.model("link",linkSchema);

module.exports= {Link}

