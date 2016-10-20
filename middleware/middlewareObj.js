var middlewareObj={};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    req.flash("error","Please log in first!");
    res.redirect("/");
    }
};

module.exports = middlewareObj;
