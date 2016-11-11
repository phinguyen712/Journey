
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






module.exports=router;
