
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
    yelp.search({ term: req.body.term, location: req.body.location, limit:10 }).then(function(yelpData){
           res.json(yelpData)}).catch(function(reason){
             res.json(reason);
           });
});


module.exports=router;
