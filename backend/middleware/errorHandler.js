function ErrorHundler(Error,req,res,next){
    res.status(Error.status || 500);
    res.send ({
     "error": true, 
     "message": Error.message ,
     "status":Error.status
    })
}

module.exports = ErrorHundler;