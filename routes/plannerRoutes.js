var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    yelpData                =   require("../models/yelp.js");




router.get("/planner",function(req,res){
    res.render('planner/planner'); 
});

//loop through an array with Yelp Id within the req.user object and check 
//yelpData collection for any matching document.Push these results into tempArr
//send tempArr to page sending AJAX request
function populateUsersData(req,res,userYelpArr){
    var tempArr = [];//array for temprorarily storing populatedData
    var counter = 0;//counter for handling ASYNC
    //show all of user's favorites on the planner page by searching through yelpData
    //and linking to user.favorites
    if(userYelpArr == "" || userYelpArr==null){
        res.json(tempArr);
    }else{
        userYelpArr.forEach(function(userProperties){
            yelpData.findOne({'business.id': userProperties},function(err,foundYelpData){
                if(err){
                    console.log(err);
                }else{
                    tempArr.push(foundYelpData.business);
                    counter++;
                    if(counter == userYelpArr.length){
                      res.json(tempArr);   
                    }
                }
            });
        });
    }
}
    
router.get("/planner/favorites/show",function(req,res){
    populateUsersData(req,res,req.user.favorites);
});


router.get("/planner/schedule/show",function(req,res){
    populateUsersData(req,res,req.user.schedule);
});
  
  
    
router.post("/planner/toDo/new",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
         if(err){
             console.log(err);
         }else{
                foundUser.schedule.push(req.body.id);
                foundUser.save();
                populateUsersData(req,res,foundUser.schedule);
            }
    });
});


router.put("/planner/schedule/edit",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.schedule = req.body.id;
            foundUser.save();
            populateUsersData(req,res,foundUser.schedule);
            console.log(foundUser.schedule);
        }
    });
});  



router.delete("/planner/toDo/delete",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            var deleteToDo = req.body.id;
            delete foundUser.schedule.splice(deleteToDo,1);
            foundUser.save();
            populateUsersData(req,res,foundUser.schedule);
        }
    });
});
    

module.exports=router;