var express = require("express"),
    router = express.Router({mergeParams: true}),
    User = require("../models/users.js"),
    journeys = require("../models/journeys.js"),
    middlewareObj = require("../middleware/middlewareObj.js"),
    yelpData = require("../models/yelp.js");



//
router.post("/user/data", function(req, res) {
  if(!req.user){
    res.json({
      favorites:req.body.favorites,
      user:req.body.user,
      schedule:req.body.schedule
    });
  }else{
    User.findById(req.user.id).populate("journeys").exec(function(err,foundUser) {
      if(err){
        console.log(err);
      }else{
       populateUsersData(req, res, req.user.favorites,function(userfavorites){
           if(foundUser.journeys.length === 0){
             res.json({
               favorites:userfavorites,
               user:foundUser,
               schedule:false
             });
           }else{
             foundUser.journeys.forEach(function(journey) {
                if (journey._id == foundUser.currentJourney.id) {
                    populateUsersData(req,res, journey.days[0].journeySchedule,
                        function(userSchedule) {
                             res.json({
                               favorites:userfavorites,
                               user:foundUser,
                               schedule:userSchedule
                             });
                        }
                    );
                }
            });
           }
          });
      }
    });
  }
});

//
router.post("/planner/journey/show", function(req, res) {
    User.findById(req.user.id).populate("journeys").exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            var journeyId = req.body.id;
            var journeyName = req.body.name;
            foundUser.currentJourney.id = journeyId;
            foundUser.currentJourney.name = journeyName;
            foundUser.save();
            foundUser.journeys.forEach(function(journey){
                if (journey._id == journeyId) {
                    if(journey.days[0]){
                      populateUsersData(req, res, journey.days[0].journeySchedule,
                          function(tempArr) {
                              res.json({
                                  schedule: tempArr,
                                  User: foundUser
                              });
                          }
                      );
                    }else{
                      res.json({
                          schedule: [],
                          User: foundUser
                      });
                    }

                }else{}
            });

        }
    });
});

//
router.post("/planner/days", function(req, res) {
    journeys.findById(req.body.journeyId, function(err, foundJourney) {
        if (err) {
            console.log(err);
        }else {
            var day = foundJourney.days[req.body.day];
            if (!day) {
              res.json("");
            }else{
              populateUsersData(req, res, day.journeySchedule,
                function(tempArr) {
                    res.json(tempArr);
              });
            };
        };
    });
});
//
router.post("/planner/toDo/new", function(req, res) {
    var dayIndex = parseInt(req.body.day) - 1; //current day of the sortpanel
    //add favorites to journey database in journeys.days[x].journeySchedule
    journeys.findById(req.body.journeyId, function(err, foundJourney) {
        if (err) {
            console.log(err);
        }
        else {
            if (!foundJourney.days[dayIndex]) {
                foundJourney.days[dayIndex] = {journeySchedule: [req.body.id]};
            }else {
                foundJourney.days[dayIndex].journeySchedule.push(req.body.id);
            }
            foundJourney.save();
            populateUsersData(req, res, foundJourney.days[dayIndex].journeySchedule,
                function(tempArr) {
                    res.json(tempArr);
                }
            );
        }
    });
});


router.put("/planner/schedule/edit", function(req, res) {
    journeys.findById(req.body.journeyId, function(err, foundJourney) {
        if (err) {
            console.log(err);
        }
        else {
            var dayIndex = parseInt(req.body.day) - 1;
            foundJourney.days[dayIndex].journeySchedule = req.body.id;
            var scheduleList = foundJourney.days[dayIndex].journeySchedule;
            foundJourney.save();
            populateUsersData(req, res, scheduleList, function(tempArr) {
                res.json(tempArr);
            });
        }
    });
});


router.delete("/planner/toDo/delete", function(req, res) {
    journeys.findById(req.body.journeyId, function(err, foundJourney) {
        if (err) {
            console.log(err);
        }
        else {
            var deleteToDo = req.body.index;
            var dayIndex = parseInt(req.body.day) - 1;

            delete foundJourney.days[dayIndex].journeySchedule.splice(deleteToDo, 1);
            foundJourney.save();

            populateUsersData(req, res, foundJourney.days[dayIndex].journeySchedule,
                function(tempArr) {
                    res.json(tempArr);
                });
        }
    });
});



router.put("/planner/captions/edit", function(req, res) {
    journeys.findById(req.body.journeyId, function(err, foundJourney) {
        if (err) {
            console.log(err);
        }
        else {
            foundJourney.caption = req.body.editedCaptions;
            foundJourney.save();
        }
    });
});

//
//remove favorites from Users
router.delete("/favorites/delete",function(req,res){
     User.update({"_id": req.user.id}, {$pull: {"favorites": req.body.id}}, function(err, removedFavorites){
        if(err){
            console.log(err);
        }else{
            User.findById(req.user.id, function(err,newData){
                if(err){
                    console.log(err);
                }else{
                  populateUsersData(req,res,newData.favorites,function(tempArr){
                     res.json(tempArr);
                   }
                 );
                }
            });
        }
        });
});

//
//save favorites when heart toggle is clicked
router.post("/favorites/save",function(req,res){
    User.findById(req.user.id,function(err,userAccount){
        if(err){
            console.log(err);
        }else{
          var index = userAccount.favorites.indexOf(req.body.id);

          if(index === -1){
            userAccount.favorites.push(req.body.id);
            userAccount.save();
          }else{

            userAccount.favorites.splice(index,1);
            userAccount.save();
          }
            //store data into yelp schema for faster load when re-rendering in planner
            yelpData.findOne({'business.id': req.body.id},function(err,matchFavorites){
               if(err){
                   console.log(err);
                }else{
                  if(!matchFavorites){
                    yelpData.create({business:req.body},function(err,storedYelpData){
                      if(err){
                          console.log(err);
                      }else{
                        return populateUsersData(req,res,userAccount.favorites,function(userFavorites){
                            res.json(userFavorites);
                        });
                      };
                    });
                  }else{
                  populateUsersData(req,res,userAccount.favorites,function(userFavorites){
                      res.json(userFavorites);
                  });
                }
                }
            });
        }
    });
});

//loop through an array with Yelp Id within the req.user object and check
//yelpData collection for any matching document.Push these results into tempArr
//send tempArr to page sending AJAX request
var populateUsersData = function(req, res, userYelpArr, callback) {
    var tempArr = []; //array for temprorarily storing populatedData
    var counter = 0; //counter for handling ASYNC
    //show all of user's favorites on the planner page by searching through yelpData
    //and linking to user.favorites
    var ArrayExist = userYelpArr ? userYelpArr: tempArr
    if (ArrayExist.length < 1) {
        callback(tempArr);
    }
    else {
        userYelpArr.forEach(function(userProperties) {
            yelpData.findOne({'business.id': userProperties}, function(err, foundYelpData) {
                if (err) {
                    console.log(err);
                }
                else {
                  if(foundYelpData)
                    tempArr.push(foundYelpData.business);
                    counter++;
                    if (counter == userYelpArr.length) {
                        callback(tempArr);
                    }
                }
            });
        });
    }
}


module.exports = router;
