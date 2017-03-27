var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Comments                = require("../models/comments.js"),
    User                    = require("../models/users.js"),
    yelpData                = require("../models/yelp.js"),
    middlewareObj           = require("../middleware/middlewareObj.js"),
    journey                 = require("../models/journeys.js");




router.get("/newJourney",middlewareObj.isLoggedIn,function(req,res){
    res.render("newJourney/newJourney",{ page:'newJourney'});
});


//publish journey and store in published collections
router.post("/journey/publishJourney/Create",function(req,res){
    journey.findById(req.body.journeyId,function(err,foundJourney){
        if(err){
            console.log(err);
        }else{
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd;
            }
            if(mm<10) {
                mm='0'+mm;
            }
            today = mm+'/'+dd+'/'+yyyy;
            foundJourney.publishDate = today;
            foundJourney.publish = true;
            foundJourney.save();
            res.redirect("/planner");
        }
    });
});


router.post("/newJourney",function(req,res){
   if(req.user){
     var newJourney = {
            userName:req.user.username,
            journeyName:req.body.journeyName,
            caption:req.body.caption,
            days:"",
            publish:false,
      };
      journey.create(newJourney,function(err,newJourney){
          if(err){
              console.log(err);
          }else{
              User.findById(req.user.id,function(err,foundUser){
                  if(err){
                      console.log(err);
                  }else{
                  foundUser.journeys.push(newJourney.id);
                  foundUser.currentJourney.id = newJourney.id;
                  foundUser.currentJourney.name = req.body.journeyName;
                  foundUser.save();
                      foundUser.populate("journeys",function(err,userjourney){
                          if(err){
                              console.log(err);
                          }else{
                            res.json(userjourney);
                          }
                      });
                  }
              });
          };
      });
    }else{
      res.json("")
    }
});

router.delete("/Journey",function(req,res){
  User.findById(req.user.id,function(err,foundUser){
    var index = foundUser.journeys.indexOf(req.body.id);
    foundUser.journeys.splice(index,1);
    foundUser.save();
    journey.findByIdAndRemove(req.body.id,function(err,removedJourney){
      if(err){
        console.log(err)
      }else{
        foundUser.populate("journeys",function(err,userjourney){
            if(err){
                console.log(err);
            }else{
              res.json(userjourney);
            }
        });
      }
    });
  });
});


//loop through an array with Yelp Id within the req.user object and check
//yelpData collection for any matching document.Push these results into tempArr
//send tempArr to page sending AJAX request
function populateUsersData(req,res,daycouner,journey,x,userYelpArr,callback){
    var tempArr = [];//array for temprorarily storing populatedData
    var counter = 0;//counter for handling ASYNC
    //show all of user's favorites on the planner page by searching through yelpData
    //and linking to user.favorites
    if(!userYelpArr || userYelpArr == "" || userYelpArr==null){
        callback(tempArr);
    }else{
        userYelpArr.forEach(function(userProperties){
            yelpData.findOne({'business.id': userProperties},function(err,foundYelpData){
                if(err){
                    console.log(err);
                }else{
                    tempArr.push(foundYelpData.business);
                    counter++;
                    if(counter == userYelpArr.length){
                      callback(tempArr , x , journey);
                    }
                }
            });
        });
    }
}

module.exports=router;
