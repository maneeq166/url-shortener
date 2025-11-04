const { User } = require("../../models/auth")

exports.createUser = async (username,email,password,role) =>{
    if(!username || !email || !password ||  !role=="user"){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    const user = await User.findOne({email:email})

    if(user){
        return {
            data:null,
            statusCode:400,
            message:"Email already exists"
        }
    }

    user = await User.create({username,email,password});

    return {
        data:user.username,
        statusCode:201,
        message:"Registered Successfully"
    }
}

