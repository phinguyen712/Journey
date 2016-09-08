var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    Yelp                    =   require("yelp"),
    yelpData                =   require("../models/yelp.js"),
    User                    =   require("../models/users.js");
        
        
var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});

router.get("/search",function(req,res){
   res.render("search/search"); 
});
    
//send Yelp API data to search page
router.post("/favorites",function(req,res){
    //search businesses with yelp API
    yelp.search({ term: req.body.term, location: req.body.location }).then(function (yelpData) {
     User.findById(req.user.id, function(err,currentUserDocument){
         if(err){
             console.log(err);
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
    
//Ajax get request for yelpData from search.ejs    
router.get("/favorites", function(req,res){
    User.findById(req.user.id,function(err,favoritesData){
        if(err){
            console.log(err);
        }
            res.json(favoritesData.favorites);
    });
});    
    
//save favorites when heart toggle is clicked
router.post("/favorites/save",function(req,res){
console.log(req.user);
    User.findById(req.user.id,function(err,userAccount){
        if(err){
            console.log(err);
        }else{
            userAccount.favorites.push(req.body.id);
            userAccount.save(); 
            //store data into yelp schema
            yelpData.findOne({'business.id': req.body.id},function(err,matchFavorites){
               if(err){
                   console.log(err);
                }else if(!matchFavorites){
                  yelpData.create({business:req.body},function(err,storedYelpData){
                    if(err){
                        console.log(err);
                    }console.log(storedYelpData);
                  }); 
                }
            res.json(userAccount);
            });
        }
    });
});


//remove favorites from Users
router.delete("/favorites/delete",function(req,res){
console.log('delete');
     User.update({"_id": req.user.id}, {$pull: {"favorites": req.body.id}}, function(err, removedFavorites){
        if(err){
            console.log(err);
        }else{
            console.log(removedFavorites);
            User.findById(req.user.id, function(err,newData){
                if(err){
                    console.log(err);
                }else{
                    console.log(newData);
                     res.json(newData);
                }
            });
            
            
        }
        });
});

module.exports=router;
