var express                 =   require("express"),
    app                     =   express(),
    $                       =   require("jquery"),
    mongoose                =   require("mongoose"),
    bodyParser              =   require("body-parser"), 
    Yelp                    =   require("yelp"),
    journey                 =   require("./models/journeys.js"),
    User                    =   require("./models/users.js"),
    comments                =   require("./models/comments.js"),
    yelpData                =   require("./models/yelp.js"),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    passportLocalMooose     =   require("passport-local-mongoose"),
    journeysRoutes          =   require("./routes/journeysRoutes.js"),
    commentsRoutes          =   require("./routes/commentsRoutes.js"),
    usersRoutes             =   require("./routes/usersRoutes.js"),
    favoriteRoutes          =   require("./routes/favoriteRoutes.js"),
    methodOverride          =   require("method-override");
  

var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});

    app.use(require("express-session")({
    secret: "Journey code",
    resave: false,
    saveUninitialized: false
}));



app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/journey_app");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs" );

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//decode and endcode sessions for Authorization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set req.user as currentUser to be used in views/header
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.get('/',function(req, res){
    res.render("search/search");
});


app.get("/planner",function(req,res){
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
    userYelpArr.forEach(function(userProperties){
        yelpData.findOne({'business.id': userProperties},function(err,foundYelpData){
            if(err){
                console.log(err);
            }else{
                console.log(userProperties);
                console.log(foundYelpData.business);
                tempArr.push(foundYelpData.business);
                counter++;
                if(counter == userYelpArr.length){
                  res.json(tempArr);   
                }
            }
        });
    });
}

    
app.get("/planner/favorites/show",function(req,res){
    console.log(req.user);
    populateUsersData(req,res,req.user.favorites);
});


app.get("/planner/schedule/show",function(req,res){
    populateUsersData(req,res,req.user.schedule);
});
  
  
    
app.post("/planner/toDo/new",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
         if(err){
             console.log(err);
         }else{
             foundUser.schedule.push(req.body.id);
             foundUser.save();
             res.json(req.body);
         }
    });
});

app.put("/planner/schedule/edit",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.schedule = req.body.id;
            foundUser.save();
            console.log(foundUser.schedule);
        }
    });
});  



app.delete("/planner/toDo/delete",function(req,res){
    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            var deleteToDo = req.body.id;
            delete foundUser.schedule.splice(deleteToDo,deleteToDo);
            res.send(deleteToDo);
            foundUser.save();

        }
    });
});

app.use(journeysRoutes);
app.use(commentsRoutes);
app.use(usersRoutes.router);
app.use(favoriteRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Journey has started ");
});

