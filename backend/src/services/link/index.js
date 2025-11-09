const { nanoid } = require("nanoid");
const { Link } = require("../../models/link")

exports.createShortLink = async (fullUrl,userUrl,userId,size,protocol,host) =>{
    if(!fullUrl||!userId||!size){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    let urlOfUser = await Link.findOne({userUrl});

    if(urlOfUser){
        return {
            data:null,
            message:"Custom url already made",
            statusCode:400
        }
    }

    let shortCode = nanoid(size);


    let shortUrl = `${protocol}://${host}/${shortCode}`

    let UsersUrl = `${protocol}://${host}/${userUrl}`


    let url = await Link.create({fullUrl,shortUrl,userId,userUrl:UsersUrl});

    if(!url){
        return {
            data:null,
            message:"Something went Wrong",
            statusCode:400
        }
    }

    return {
        data:url,
        message:"Url created",
        statusCode:201
    }

}