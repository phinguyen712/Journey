var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    Comments                =   require("../models/comments.js"),
    journey                 =   require("../models/journeys.js");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    res.redirect("/signup");
    }
}


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