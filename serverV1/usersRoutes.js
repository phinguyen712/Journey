  var express               =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    passport                =   require("passport"),
    yelpData                =   require("../models/yelp.js"),
    yelp                    =   require("../keys/yelpKey.js");


    router.post("/signup", function(req,res){
        User.register(new User({username: req.body.username}), req.body.password, function(err,user){
            if(err){
                res.json({err:err.message})
            }else{
                passport.authenticate("local")(req,res, function(){
                res.json({err:"authorized",
                          user:user});
                });
            }
        });
    });
    router.get("/user/data",function(req,res){
      if(!req.user){
          res.json({'foundUser':{'username':false}})
      }else{
        User.findById(req.user.id,function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                res.json({foundUser})
            }
          });
        }
    });

    router.post('/login', passport.authenticate("local",{failureRedirect:'/',failureFlash:true}),function(req,res){
                res.redirect("/");
    });


    router.get("/logout",function(req,res){
        req.logout();
        res.redirect("/");
    });

    module.exports.router=router;
