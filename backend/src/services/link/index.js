const { nanoid } = require("nanoid");
const { Link } = require("../../models/link/index");
const { Click} = require("../../models/click/index");
const { parseDevice, hashIp } = require("../../config/analytics");
const geoIp = require("geoip-lite");
const qrcode = require("qrcode")

exports.createShortLink = async (
  fullUrl,
  userUrl,
  userId,
  size,
  protocol,
  host,
) => {
  if (!fullUrl || !userId || !size) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let UsersUrl = `${protocol}://${host}/${userUrl}`;

  let urlOfUser = await Link.findOne({ userUrl: UsersUrl });

  if (urlOfUser) {
    return {
      data: null,
      message: "Custom url already made",
      statusCode: 400,
    };
  }

  let shortCode = nanoid(size);

  let shortUrl = `${protocol}://${host}/${shortCode}`;

  urlOfUser = await Link.findOne({ shortUrl });

  if (urlOfUser) {
    return {
      data: null,
      message: "Try one more time,custom slug already exists",
      statusCode: 400,
    };
  }

 


  let url = await Link.create({ fullUrl, shortUrl, userId, userUrl: UsersUrl });
  

  if (!url) {
    return {
      data: null,
      message: "Something went Wrong",
      statusCode: 400,
    };
  }

  return {
    data: url,
    message: "Url created",
    statusCode: 201,
  };
};

exports.getOneUrl = async (linkId) =>{
  if(!linkId){
    return {
      data:null,
      statusCode:400,
      message:"Required fields are missing"
    }
  }

  let url = await Link.findById(linkId);

  if(!url){
    return{
      data:null,
      statusCode:400,
      message:"Cant found Link"
    }
  }

  let qrCode = qrcode.toDataURL(url.fullUrl);

  let analytics = await Click.findOne({linkId:url._id});
  if(!analytics){
    return{
      data:null,
      statusCode:400,
      message:"Cant found Link"
    }
  }

  return{
    data:{
      qrCode,analytics
    },
    message:"Fetched link",
    statusCode:200
  }
}

exports.getShortLink = async (fullUrl, userUrl, shortUrl, userId) => {
  if (!userId) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let url;
  if (fullUrl) {
    url = await Link.find({ userId, fullUrl });

    return {
      data: url,
      message: "Url found",
      statusCode: 200,
    };
  } else if (shortUrl) {
    url = await Link.find({ userId, shortUrl });
    return {
      data: url,
      message: "Url found",
      statusCode: 200,
    };
  } else if (userUrl) {
    url = await Link.find({ userId, userUrl });
    return {
      data: url,
      message: "Url found",
      statusCode: 200,
    };
  }

  let docs = await Link.countDocuments({ userId });

  url = await Link.find({ userId });
  

  return {
    data: {
      "Total-Links": docs,
      urls: url,
    },
    message: "Url found",
    statusCode: 200,
  };
};

exports.getSlugRandom = async (shortUrl,userAgent,
  country,
  referer) => {
  if (!shortUrl) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let url = await Link.findOne({ shortUrl });

  if (!url) {
    return {
      data: null,
      statusCode: 404,
      message: "Url not found",
    };
  }

  if (url.isExpired || url.expiredDate < new Date()) {
    return {
      data: null,
      statusCode: 400,
      message: "Url expired",
    };
  }

  url.isClicks += 1;

  await url.save();

   const {deviceType,os,browser} = parseDevice(userAgent);

  const ipHash = hashIp(country);

  const geo = geoIp.lookup(country);


  let click = await Click.create({linkId:url._id,referer,timestamp:Date.now(),deviceType,os,browser,country:geo,ipHash})

  return {
    data: url,
    statusCode: 200,
    message: "Redirecting",
  };
};

exports.getUserSlug = async (userUrl,userAgent,country,referer) => {
  if (!userUrl) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let url = await Link.findOne({ userUrl });

  if (!url) {
    return {
      data: null,
      statusCode: 400,
      message: "Can't find this link",
    };
  }

  if (url.isExpired || url.expiredDate < new Date()) {
    return {
      data: null,
      statusCode: 400,
      message: "Url expired",
    };
  }

  url.isClicks += 1;

  await url.save();
 
  
   const {deviceType,os,browser} = parseDevice(userAgent);

  const ipHash = hashIp(country);

  const geo = geoIp.lookup(country);


  let click = await Click.create({linkId:url._id,referer,timestamp:Date.now(),deviceType,os,browser,country:geo,ipHash})


  return {
    data: url,
    statusCode: 200,
    message: "Redirecting",
  };
};

exports.updateUrl = async (searchNameorId, data) => {
  if (!searchNameorId) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let url;
  if (!searchNameorId.fullUrl && !searchNameorId.userId && searchNameorId.id) {
    url = await Link.findByIdAndUpdate(searchNameorId.id, data, { new: true });
  } else if (
    !searchNameorId.fullUrl &&
    searchNameorId.userId &&
    !searchNameorId.id
  ) {
    url = await Link.findOneAndUpdate({ userId: searchNameorId.userId }, data, {
      new: true,
    });
  } else if (
    searchNameorId.fullUrl &&
    !searchNameorId.userId &&
    !searchNameorId.id
  ) {
    url = await Link.findOneAndUpdate(
      { fullUrl: searchNameorId.fullUrl },
      data,
      { new: true }
    );
  }

  return {
    data: url,
    statusCode: 200,
    message: "Url updated",
  };
};

exports.deleteUrl = async (searchNameorId) => {
  if (!searchNameorId) {
    return {
      data: null,
      statusCode: 400,
      message: "Required fields are missing",
    };
  }

  let url;
  if (!searchNameorId.fullUrl && !searchNameorId.userId && searchNameorId.id) {
    url = await Link.findByIdAndDelete(searchNameorId.id);
  } else if (
    !searchNameorId.fullUrl &&
    searchNameorId.userId &&
    !searchNameorId.id
  ) {
    url = await Link.findOneAndDelete({ userId: searchNameorId.userId });
  } else if (
    searchNameorId.fullUrl &&
    !searchNameorId.userId &&
    !searchNameorId.id
  ) {
    url = await Link.findOneAndDelete({ fullUrl: searchNameorId.fullUrl });
  }

  return {
    data: url,
    statusCode: 200,
    message: "Url deleted",
  };
};
