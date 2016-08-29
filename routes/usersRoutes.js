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


function queryYelpData(userProperties,exportFunction){
  console.log(userProperties);
    //Array of non-repeating elements, eliminate repeated yelp search     
     var uniqueProperties = userProperties.filter(function(elem, index, self){
            return index == self.indexOf(elem);
     });
     console.log(uniqueProperties);
      for(var x = 0 ; x<uniqueProperties.length ; x++){

  //
  //look in database if data already exist, if it does. overwrite it. 
  //if it doesnt, create new database
            yelp.business(uniqueProperties[x]).then(function(yelpId){
                console.log(yelpId.id)
                yelp.findOneAndUpdate({business:{'id':yelpId.id}},{business:yelpId},{new: true},function(err,foundBusiness){
                    if(err){    
                        console.log(err);
                    }else{
                        console.log(foundBusiness+"hey");
                    }    
                });
        });
    }
} 

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
          
          //  queryYelpData(foundUser.favorites,function(matchFavorites){
          //  });
         
          //  queryYelpData(foundUser.schedule,function(matchSchedule){
          //  });
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