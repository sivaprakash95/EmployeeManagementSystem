// ----------USERS Controller-----------------

exports.checkId=(req,res,next,value)=>{
    console.log(`ID: ${value}`)
    return res.status(404).json({
        status:"error",
        message:"Internal server error",
        timeStamp:req.timeStamp
    })
    
}

exports.getAllUser = (req,res)=>{
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        timeStamp:req.timeStamp
    })
}

exports.getSingleUser= (req,res)=>{
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        timeStamp:req.timeStamp
    })
}

exports.checkBody=(req,res,next)=>{
    console.log(req.body.user_name,req.body.password)
    if(!req.body.user_name || !req.body.password){
        return res.status(404).json({
            status:"Invalid Body",
            message:"Internal server error",
            timeStamp:req.timeStamp
        })
    }
    next()
}

exports.createUser= (req,res)=>{
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        timeStamp:req.timeStamp
    })
}

exports.updateUser= (req,res)=>{
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        timeStamp:req.timeStamp
    })
}

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:"error",
        message:"Internal server error"
    })
}

