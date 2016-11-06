
var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    Yelp                    =   require("yelp"),
    yelpData                =   require("../models/yelp.js"),
    middlewareObj           =   require("../middleware/middlewareObj.js"),
    User                    =   require("../models/users.js");


var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});


//send Yelp API data to search page
router.post("/favorites",function(req,res){
    //search businesses with yelp API
    yelp.search({ term: req.body.term, location: req.body.location, limit:10 }).then(function (yelpData) {
     User.findById(req.user.id, function(err,currentUserDocument){
         if(err){

         }else{
             //create a poperty for displaying heart as red or empty(if users have already added the yelp location
             //to their favorite or not)
             for( var x = 0; x < yelpData.businesses.length ; x++) {
                for(var i = 0; i <currentUserDocument.favorites.length; i++ ) {
                    if(yelpData.businesses[x].id == currentUserDocument.favorites[i]){
                        yelpData.businesses[x].heartOn="true";
                    }
                }
         }
         }
           res.json(yelpData);
     });
    });
});


//save favorites when heart toggle is clicked
router.post("/favorites/save",function(req,res){
    User.findById(req.user.id,function(err,userAccount){
        if(err){
            console.log(err);
        }else{

          var index = userAccount.favorites.indexOf(req.body.id);

          if(index == -1){
            //add favorites
            console.log("1")
            userAccount.favorites.push(req.body.id);
            userAccount.save();
          }else{
            userAccount.favorites.splice(index,1);
            userAccount.save();
          }

          res.json(userAccount);
            //store data into yelp schema for faster load when re-rendering in in planner
            yelpData.findOne({'business.id': req.body.id},function(err,matchFavorites){
               if(err){
                   console.log(err);
                }else if(!matchFavorites){
                  yelpData.create({business:req.body},function(err,storedYelpData){
                    if(err){
                        console.log(err);
                    };
                  });
                }
            });
        }
    });
});


module.exports=router;
