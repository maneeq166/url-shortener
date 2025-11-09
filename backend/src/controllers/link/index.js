const { createShortLink } = require("../../services/link");
const { asyncHandler } = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse/index")
exports.handleLinkCreation = asyncHandler(async(req,res)=>{
    const id = req.id;
    const {fullUrl,userUrl,size} = req.body;

    const protocol = req.protocol;
    const host = req.get("host");

    const result = await createShortLink(fullUrl,userUrl,id,size,protocol,host);

    const {message,data,statusCode} = result;

    return res.status(statusCode).json(new ApiResponse(statusCode,data,message))
})