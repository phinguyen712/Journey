var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    passport                =   require("passport"),
    $                       =   require("jquery"),
    Yelp                    =   require("yelp");


var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});

var matchFavorites = [];
var matchSchedule = [];

//function for searching up yelp's businesses based on users's propoerties e.g
// schedule/favorite/ToDo
  function loadMatchData(matchArr,userProperties,exportFunction){
     
     //Array for storing all search results from yelp
     var retrievedYelpData = [];
     
     //clear array
     matchArr.length = 0;
    
    //Array of non-repeating elements, eliminate repeated yelp search     
     var uniqueProperties = userProperties.filter(function(elem, index, self){
            return index == self.indexOf(elem);
        });
    
    //set matchArr[] to lenght of userProperties
     matchArr = Array.apply(null, Array(userProperties.length)).map(function(){});
   
    // API data request from yelp based on uniqueProperties
    //counter for initiating next step when async request is complete
     var counter = 0;
     
     //search up all businesses in the unqieue Properties object         
       for(var x = 0 ; x < uniqueProperties.length ; x++){
            yelp.business(uniqueProperties[x]).then(function(yelpId){
                retrievedYelpData.push(yelpId);
                counter ++;
           
           if(counter == uniqueProperties.length){
               console.log("hey" + counter);
    
            
            var yelpIndex  =  retrievedYelpData.map(function(dataId){
                return dataId.id;
            });
        
        for(var z = 0 ; z < userProperties.length ; z++){
                    
            
            var index = yelpIndex.indexOf(userProperties[z]);
            console.log(index);
                    
                   matchArr.splice(z , 1 , retrievedYelpData[index]);
           
                }
                matchArr.forEach(function(hey){
                    console.log(hey.id);
                });
               
           }
           });
       }
     exportFunction(matchArr);
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
        console.log(foundUser);
      //   loadMatchData(matchFavorites,foundUser.favorites,function(matchFavorites){
      //       
      //       module.exports.favorites = matchFavorites;
      //   });
    
           loadMatchData(matchSchedule,foundUser.schedule,function(matchSchedule){
          //        console.log(matchFavorites.id)})});
               module.exports.schedule = matchSchedule;
           });
        }        
    });
 

});


router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/journey");
    console.log(req.user);
});

module.exports.router=router;