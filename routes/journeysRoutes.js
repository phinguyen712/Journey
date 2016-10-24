var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Comments                = require("../models/comments.js"),
    User                    = require("../models/users.js"),
    yelpData                = require("../models/yelp.js"),
    middlewareObj           = require("../middleware/middlewareObj.js"),
    journey                 = require("../models/journeys.js");


router.get("/test",function(req, res){
    journey.find({publish:true}, function(err,journey){
        if (err){
        }else{
        //obtain images for all published journeys
            var all_Images = {};
            var journeyCounter = 0;
           //allow loading of landing page even if no data is present
           //for developers
            if(journey.length == 0){
                res.render("frontPage/landingPage",{
                    user:"",journey:[""],images:[""],page:"home",flashMesssage:req.flash("error")
                });
            }else{
                for( var x = 0 ; x < journey.length ; x++){
                    var daycounter = 0;
                    var journeyId = [];

                    journey[x].days.forEach(function(eachDay){

                    var queryCounter = 0;//counter for waiting until ajax is complete

                      populateUsersData(req,res,daycounter,journey,x,eachDay.journeySchedule,function(yelpData,x){
                         var journeyName = journey[x].journeyName;
                         var journeyObj={} ;
                        yelpData.forEach(function(yelpId){
                            journeyId.push(yelpId.image_url);
                            queryCounter++;

                            if(queryCounter == yelpData.length ){
                                daycounter++;

                                if(daycounter == journey[x].days.length ){

                                    var uniqueId = removeRepeats(journeyId);

                                     journeyObj = ({[journeyName]:uniqueId});
                                     all_Images[journeyName] = uniqueId;
                                     journeyCounter++;

                                     if(journeyCounter == journey.length){
                                     var user = req.user;

                                     if(!req.user){
                                         user = {id:"",username:""};
                                     }
                                     var data = {user:user,
                                                journey:journey,
                                                images:all_Images,
                                                page:"home",
                                                flashMesssage:req.flash("error")
                                                };

                                      res.render("frontPage/landingPage",data);

                                    }
                                     journeyId = [];
                                     daycounter = 0;
                                }

                            }
                        });
                      });
                    });

                }
            }
        }
    });
});


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
            console.log(req.user.id);
            User.findById(req.user.id,function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                foundUser.journeys.push(newJourney.id);
                var currentId = newJourney.id;
                var currentName = req.body.journeyName;
                foundUser.currentJourney.id = currentId;
                foundUser.currentJourney.name = currentName;
                foundUser.save();
                    foundUser.populate("journeys",function(err,userjourney){
                        if(err){
                            console.log(err);
                        }else{
                        res.redirect("searchRoutes");
                        }
                    });
                }
            });
        }
    });
    res.redirect("search");
});


function removeRepeats(Arr) {
    var seen = {};
    var out = [];
    var length = Arr.length;
    var j = 0;
    for(var i = 0; i < length; i++) {
         var item = Arr[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}




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
