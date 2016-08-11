var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    Yelp                    =   require("yelp"),
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
                  
                    }else{}
               
                }
                   
         }
         
         }
             
           res.json(yelpData);
     });    
   
    });
});    
    
    
router.get("/favorites", function(req,res){

    User.findById(req.user.id,function(err,favoritesData){
        
        if(err){
            console.log(err);
        }
            console.log(favoritesData.favorites);
            res.json(favoritesData.favorites);
    });
});    
    
router.post("/favorites/save",function(req,res){

    User.findById(req.user.id,function(err,userAccount){
        if(err){
            console.log(err);
        }else if(!userAccount.favorites){
            userAccount.favorites = req.body.id;
            console.log(userAccount);

        }else{
            userAccount.favorites.push(req.body.id);
            userAccount.save(); 
            console.log(userAccount);
        }
        res.json(userAccount);
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
