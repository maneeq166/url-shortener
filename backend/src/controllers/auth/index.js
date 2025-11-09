const { createUser, loginUser, checkUser } = require("../../services/auth");
const {asyncHandler }= require("../../utils/asyncHandler/index");
const ApiResponse = require("../../utils/apiResponse/index")

exports.handleRegistration = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;

    const result = await createUser(username,email,password);

    const {message,data,statusCode} = result

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})


exports.handleLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const result = await loginUser(email,password);

    const {message,data,statusCode} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})

exports.handleUserDetails = asyncHandler(async(req,res)=>{
    const id = req.id;

    const result = await checkUser(id);

    const {message,data,statusCode} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})

