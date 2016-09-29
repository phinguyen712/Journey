var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    Comments                =   require("../models/comments.js"),
    User                    =   require("../models/users.js"),
    journey                 =   require("../models/journeys.js");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    res.redirect("/signup");
    }
}

router.post("/journey/likes",isLoggedIn, function(req,res){
   User.findById(req.user.id,function(err,foundUser){
       if(err){
           console.log(err);
       }else{
        journey.findById(req.body.id, function(err,foundJourney){
            if(err){
                console.log(err);
            }else{
            var indexOfUser = foundUser.liked.indexOf(req.body.id); 
            var indexOfJourney = foundJourney.likes.indexOf(req.user.id);
            var userObj = {id:req.user.id , username:req.user.username};
                if(indexOfUser == -1 ){
                //add likes for user and Journey
                    foundUser.liked.push(req.body.id);
                    foundUser.save();
                    foundJourney.likes.push(userObj);
                    foundJourney.save();
                        res.json({likes:foundJourney.likes , thumbsUp:true});
                }else{
                //remove likes for user and Journey
                   foundUser.liked.splice(indexOfUser,1);
                   foundJourney.likes.splice(indexOfJourney,1);
                   foundUser.save();
                   foundJourney.save();
                   res.json({likes:foundJourney.likes , thumbsUp:false});
                }
            }
        });
       }
   }); 
});

router.get("/journey/show/:id/Comments/new",isLoggedIn, function(req,res){
    journey.findById(req.params.id, function(err,journey){
        if(err){
            console.log(err);
        }else{
        res.render("comments/new",{journey:journey});
        }
    });
});


router.post("/journey/show/:id/Comments", function(req,res){
    
    var newComments = { username:req.user.username, comment:req.body.comment, title:req.body.title};
    
    journey.findById(req.params.id, function(err,shownJourney){
        if (err){
            console.log(err);
        } else{
           Comments.create(newComments,function(err,createdComments){
               if(err){
                   console.log(err);
               }else{
                   console.log(createdComments);
                   shownJourney.comments.push(createdComments._id);
                   shownJourney.save();
                   res.redirect("/journey/show/"+req.params.id);
                   Comments.findById(createdComments._id,function(err,foundIt){
                       if(err){
                           console.log(err);
                       }else{
                           console.log(foundIt);
                       }
                   });
               }
           });
        }
    });
});

router.get("/comments/edit/:id", function(req,res){
     Comments.findById(req.params.id, function(err,foundComments){
         if(err){
             console.log(err);
         }else{
             res.render("comments/edit",{Comments:foundComments});
         }
     });
});      

router.put("/comments/:id", function(req,res){
    Comments.findByIdAndUpdate(req.params.id,req.body.comment, function(err,updateComments){
        if(err){
            console.log(err);        
            }else{
            journey.findOne({comments:updateComments._id}, function(err,foundJourney){
                if(err){
                    console.log(err);
                }else{
                  res.redirect("/journey/show/"+foundJourney._id);
                }
            });
            }   
    });
});

router.delete("/journey/show/comments/:id", function(req,res){
    Comments.findById(req.params.id, function(err,selectedComments){
        if(err){
            console.log(err);
        }else{
            journey.findOne({comments:selectedComments._id}, function(err,foundJourney){
                if(err){
                    console.log(err);
                }else{
                    //find foundJourney, delete comment, use findJourney to reroute to showpage
                Comments.findByIdAndRemove(selectedComments,function(err,removedComments){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/journey/show/"+foundJourney._id);
                    }
                });
                }
            });
        }
    });
});
    

module.exports=router;