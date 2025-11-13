const { createShortLink, getShortLink, getSlugRandom } = require("../../services/link");
const { asyncHandler } = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse/index");
exports.handleLinkCreation = asyncHandler(async (req, res) => {
  const id = req.id;
  const { fullUrl, userUrl, size } = req.body;

  const protocol = req.protocol;
  const host = req.get("host");

  const result = await createShortLink(
    fullUrl,
    userUrl,
    id,
    size,
    protocol,
    host
  );

  const { message, data, statusCode } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleLinkRead = asyncHandler(async (req, res) => {
  const { fullUrl, userUrl, shortUrl } = req.query;
  const id = req.id;

  const result = await getShortLink(fullUrl, userUrl, shortUrl, id);
  const { message, data, statusCode } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});


exports.handleSlugRandom = asyncHandler(async(req,res)=>{
  const {slugs} = req.params;
  const protocol = req.protocol;
  const host = req.get("host");

  const shortUrl = `${protocol}://${host}/${slugs}`;

  const { statusCode, data, message } = await getSlugRandom(shortUrl);

  if(statusCode !== 200){
    return res.status(statusCode).json({message:message})
  }

  return res.redirect(data.fullUrl);
});

exports.handleSlugUserUrl = asyncHandler(async(req,res)=>{
  
})