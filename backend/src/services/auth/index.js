const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { User } = require("../../models/auth");
const { secrets } = require("../../config/env");

exports.createUser = async (username,email,password) =>{
    if(!username || !email || !password ){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    let user = await User.findOne({email:email})

    if(user){
        return {
            data:null,
            statusCode:400,
            message:"Email already exists"
        }
    }
    
    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({username,email,password:hashedPassword});

    return {
        data:user.username,
        statusCode:201,
        message:"Registered Successfully"
    }
}

exports.loginUser = async (email,password) =>{
    if( !email || !password ){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    let user = await User.findOne({email});

    if(!user){
        return {
            data:null,
            statusCode:404,
            message:"Email not found"
        }
    }

    const comparePassword = await bcrypt.compare(password,user.password);

    if(!comparePassword){
        return {
            data:null,
            message:"Wrong password",
            statusCode:400
        }
    }

    let token = jwt.sign({id:user._id,username:user.username,email:user.email,role:user.role},secrets.JWT_SECRET)

    return {
        data:token,
        statusCode:200,
        message:"Login Successfull"
    }

}


exports.checkUser = async(id) =>{
    if(!id){
        return{
            data:null,
            statusCode:404,
            message:"Please login first"
        }
    }

    let user = await User.findById(id).select("-password");

    if(!user){
        return {
            data:null,
            message:"User not found",
            statusCode:404
        }
    }

    return {
        data:user,
        message:"Here's your detail",
        statusCode:200
    }
}

