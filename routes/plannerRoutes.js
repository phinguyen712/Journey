var express                 =   require("express"),
    router                  =   express.Router({mergeParams:true}),
    User                    =   require("../models/users.js"),
    journeys                =   require("../models/journeys.js"),
    yelpData                =   require("../models/yelp.js");




router.get("/planner",function(req,res){
    res.render('planner/planner',{page:"planner"}); 
});

//loop through an array with Yelp Id within the req.user object and check 
//yelpData collection for any matching document.Push these results into tempArr
//send tempArr to page sending AJAX request
function populateUsersData(req,res,userYelpArr,callback){
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
                      callback(tempArr);   
                    }
                }
            });
        });
    }
}

router.get("/planner/favorites/show",function(req,res){
  populateUsersData(req,res,req.user.favorites,function(tempArr){
      res.json(tempArr);
  });
});




router.get("/planner/schedule/show",function(req,res){
      User.findById(req.user.id).populate("journeys").exec(function(err,foundUser){
        if(err){ 
            console.log(err);
        }else{
          foundUser.journeys.forEach(function(journey){
              if(journey._id == foundUser.currentJourney.id){
                   populateUsersData(req,res,journey.days[0].journeySchedule,
                    function(tempArr){
                        res.json({schedule:tempArr, journeys:foundUser});
                    }
                );
              }
          });
            
        }
    });
});

router.post("/planner/journey/show", function(req,res){
    User.findById(req.user.id).populate("journeys").exec(function(err,foundUser){
        if(err){ 
            console.log(err);
        }else{
         var journeyId = req.body.journeyId;
         var journeyName = req.body.journeyName;
         foundUser.currentJourney.id = journeyId;
         foundUser.currentJourney.name = journeyName;
         foundUser.save();
          foundUser.journeys.forEach(function(journey){
              if(journey._id == req.body.journeyId){
                   populateUsersData(req,res,journey.days[0].journeySchedule,
                    function(tempArr){
                        res.json({schedule:tempArr, journeys:foundUser});
                    }
                );
              }
          });
            
        }
    });
}); 


router.post("/planner/days", function(req,res){
  journeys.findById(req.body.journeyId,function(err,foundJourney){
    if(err){
        console.log(err);
    }else{
        var day = foundJourney.days[req.body.day];
        if(!foundJourney.days[req.body.day]){
            day = "";
        }
        populateUsersData(req,res,day.journeySchedule,
            function(tempArr){
                res.json(tempArr);
            }
        );
    }
    });
});

router.post("/planner/toDo/new",function(req,res){
    var dayIndex = parseInt(req.body.day)- 1;//current day of the sortpanel 

     //add favorites to journey database in journeys.days[x].journeySchedule 
    journeys.findById(req.body.journeyId,function(err,foundJourney){
        if(err){
            console.log(err);
        }else{
           console.log(foundJourney);
              if(foundJourney.days[dayIndex] == "" || !foundJourney.days[dayIndex] ){
                foundJourney.days[dayIndex] = {journeySchedule:[req.body.id]};
              }else{
                foundJourney.days[dayIndex].journeySchedule.push(req.body.id);
              } 
                foundJourney.save();
                populateUsersData(req,res,foundJourney.days[dayIndex].journeySchedule,
                    function(tempArr){
                        res.json(tempArr);
                    }   
            );
        }
    });
});


router.put("/planner/schedule/edit",function(req,res){
   journeys.findById(req.body.journeyId,function(err,foundJourney){
        if(err){
            console.log(err);
        }else{
            var dayIndex = parseInt(req.body.day)- 1;
            foundJourney.days[dayIndex].journeySchedule = req.body.id;
            var scheduleList = foundJourney.days[dayIndex].journeySchedule;
            foundJourney.save();
            populateUsersData(req,res,scheduleList,function(tempArr){
                    res.json(tempArr);
                    });
        }
    });
});  


router.delete("/planner/toDo/delete",function(req,res){
    journeys.findById(req.body.journeyId,function(err,foundJourney){
        if(err){
            console.log(err);
        }else{
            var deleteToDo = req.body.id;
            var dayIndex = parseInt(req.body.day)- 1;
            
            delete foundJourney.days[dayIndex].journeySchedule.splice(deleteToDo,1);
            foundJourney.save();
            
            populateUsersData(req,res,foundJourney.days[dayIndex].journeySchedule,
                function(tempArr){
                    res.json(tempArr);
            });
        }
    });
});
    

module.exports=router;