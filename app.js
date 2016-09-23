var express                 =   require("express"),
    app                     =   express(),
    mongoose                =   require("mongoose"),
    bodyParser              =   require("body-parser"), 
    User                    =   require("./models/users.js"),
    journeys                =   require("./models/journeys.js"),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    journeysRoutes          =   require("./routes/journeysRoutes.js"),
    commentsRoutes          =   require("./routes/commentsRoutes.js"),
    usersRoutes             =   require("./routes/usersRoutes.js"),
    searchRoutes            =   require("./routes/searchRoutes.js"),
    plannerRoutes           =   require("./routes/plannerRoutes.js"),
    methodOverride          =   require("method-override");
  

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


app.get("/newJourney",function(req,res){
    
    res.render("newJourney/newJourney",{ page:'newJourney'});
});



app.post("/newJourney",function(req,res){
    
     var newJourney = {
                        userName:req.user.username,
                        journeyName:req.body.journeyName,
                        caption:req.body.caption,
                        days:"",
                        publish:false,
    };
    
    journeys.create(newJourney,function(err,newJourney){
        if(err){
            console.log(err);
        }else{
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

   //turn publish property to "true" and set published date in --> journey object
app.post("/journey/publishJourney/Create",function(req,res){
    journeys.findById(req.body.journeyId,function(err,foundJourney){
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


app.use(plannerRoutes);
app.use(journeysRoutes);
app.use(commentsRoutes);
app.use(usersRoutes.router);
app.use(searchRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Journey has started ");
});

