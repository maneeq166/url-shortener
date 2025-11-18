exports.getAllTimeAnalytics = async (linkId)=>{
    if(!linkId){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    const timestamp = Date.now();
    
}