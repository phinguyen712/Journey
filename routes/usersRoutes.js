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

var matchFavorites = [];
var matchSchedule = [];

//function for pre-loading yelp search results into an array based on business
//id stored in Users  arrays
  function loadMatchData(matchArr,userProperties,exportFunction){
     //clear array
     matchArr.length = 0;
     
    //set matchArr[] to lenght of user favorites
       matchArr = Array.apply(null, Array(userProperties.length)).map(function(){});
   
    //APi request to yelp for each item on the user.favorites object
       for(var x = 0 ; x < userProperties.length ; x++){
            yelp.business(userProperties[x]).then(function(yelpId){
    
    //Note * this is an Async loop
    //save index number to each array so that matchArr[] will output
    //in the same order as User.favorites
    
            var  index = userProperties.indexOf(yelpId.id);
     //insert results from yelp API into matchArr in the same order as
     //User.favorites
           matchArr.splice(index,1, yelpId);
           exportFunction(matchArr);
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
          
           loadMatchData(matchFavorites,foundUser.favorites,function(matchFavorites){
               module.exports.favorites = matchFavorites;
           });
           
           loadMatchData(matchSchedule,foundUser.schedule,function(matchSchedule){
               module.exports.schedule = matchSchedule;
           });
        }        
    });
    setTimeout(function(){res.redirect("/planner")},3000);
});


router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/journey");
    console.log(req.user);
});

module.exports.router=router;