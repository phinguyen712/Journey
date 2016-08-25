var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    passport                =   require("passport"),
    $                       =   require("jquery"),
    loadMatchData           =   require("./loadMatchDataFunc.js"),
    yelpData                =   require("../models/yelp.js"),
    Yelp                    =   require("yelp");


var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});


    
    
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
            console.log(foundUser.schedule[1]);
           yelp.business(foundUser.schedule[1]).then(function(yelpId){
              yelpData.create({"business": yelpId},function(err,yelpData){
                  if(err){
                      console.log(err);
                      }else{
                          console.log(yelpData);
                      }
              });        
           });
            var matchFavorites = [];
            var matchSchedule = [];
         loadMatchData.loadMatchData(matchFavorites,foundUser.favorites,function(matchFavorites){
             module.exports.favorites = matchFavorites;
         });
         
             loadMatchData.loadMatchData(matchSchedule,foundUser.schedule,function(matchSchedule){
               module.exports.schedule = matchSchedule;
               
            });
         res.redirect("/planner");
        
        }        
    });
 

});


router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/journey");
    console.log(req.user);
});

module.exports.router=router;