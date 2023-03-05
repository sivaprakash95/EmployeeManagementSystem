exports.checkSession = (req,res,next)=>{
    if(!req.session.user_data){
        res.redirect("/ems/login")
    }
    else{
        next();
    }
}