function userSession(){
    return function(req,res,next){
        if(req.session.user){
            res.locals.user=req.session.user
            //slagame sesiqta v responsa
            res.locals.hasUser=true
            //buleva funkciq za da si ulesnim templeitite
     
        }
        next()
     }
    }
    module.exports=userSession
