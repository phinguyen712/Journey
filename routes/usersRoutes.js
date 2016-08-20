var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    passport                =   require("passport"),
    Yelp                    =   require("yelp");


var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});

var matchFavorites= [];



router.get("/signup", function(req,res){
    res.render("signup");
});


router.post("/signup", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,users){
        if(err){
            console.log(users);
            console.log(err);
        }else{
            passport.authenticate("local")(req,res, function(){
               res.render("myprofile"); 
            });
        }
        
    });
});




router.get("/myprofile", function(req,res){
    res.render("myprofile");
}),





router.post('/login', passport.authenticate("local"),function(req,res){
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            var userFavorites = foundUser.favorites;
           matchFavorites = Array.apply(null, Array(userFavorites.length)).map(function () {})
           for(var x = 0 ; x < userFavorites.length ; x++){
                yelp.business(userFavorites[x]).then(function(yelpFavorites){
                var  index = userFavorites.indexOf(yelpFavorites.id);
                    
                matchFavorites.splice(index,1, yelpFavorites);
                console.log(matchFavorites);
               
                 return yelpFavorites;
               });
           }
         
        }        
    });
    res.redirect("/planner");
});


router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/journey");
    console.log(req.user);
});

module.exports=router;