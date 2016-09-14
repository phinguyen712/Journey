var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Comments                = require("../models/comments.js"),
    journey                 = require("../models/journeys.js");



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    res.redirect("/signup");
    }
}

router.get("/",function(req, res){
    journey.find({}, function(err,journey){
        if (err){
            console.log(err);
        }else{
        res.render("frontPage/landingPage",{journey:journey,page:"home"});
        }
    });
});



router.get("/journey/new", isLoggedIn,function(req,res){
    res.render("todo/new");
});


router.get("/journey/show/:id", function(req,res){
    journey.findById(req.params.id).populate("comments").exec(function(err,journey){
         if(err){
             console.log(err);
         } else{
             res.render("todo/show",{journey:journey});
         }
    });
}); 



router.post("/journey" ,function(req,res){
    var journeyName= req.body.JourneyName;
    var location=req.body.Location;
    var description=req.body.Description;
    var newJourney= { name:journeyName,location:location,description:description, username:req.user.username};
    
    journey.create(newJourney,function(err,newCreatedJourney){
        if(err){
            console.log(err);
        } else{
            
            res.redirect("/journey");
            
        }
    });
});

//Edit Journey 

router.get("/edit/:id",function(req,res){
    journey.findById(req.params.id, function(err, journey){
        if (err){
            console.log(err);
        }else{
        res.render("todo/edit",{journey:journey});
        }
    });
});

//update Journey
router.put("/journey/:id", function(req,res){
   journey.findByIdAndUpdate(req.params.id,req.body.journey,function(err,foundandUpdate){
       if(err){
           console.log(err);
       }else{
           console.log(foundandUpdate);
           res.redirect("/journey");
       }
   });
});

router.delete("/journey/:id", function(req,res){
    journey.findByIdAndRemove(req.params.id,function(err,RemovedItems){
        if(err){
            console.log(err);
        }else{
            RemovedItems.comments.forEach(function(foundComments){
                Comments.findByIdAndRemove(foundComments,function(err,deletedComments){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/journey"); 
                    }
                });
            });
        }
    });
});

module.exports=router;