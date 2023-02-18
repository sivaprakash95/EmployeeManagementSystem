

exports.getLogin = (req,res)=>{
    res.render("login")
}

exports.postLoginBody = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(404).json({message:"email or password missing!"})
    }
    next();
}

exports.postLogin = (req,res)=>{
    res.render("dashboard",{
        email:req.body.email,
    })
    // res.status(200).json({message:"posted success"});
}