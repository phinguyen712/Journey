var express                 =   require("express"),
    app                     =   express(),
    mongoose                =   require("mongoose"),
    bodyParser              =   require("body-parser"), 
    Yelp                    =   require("yelp"),
    journey                 =   require("./models/journeys.js"),
    User                    =   require("./models/users.js"),
    comments                =   require("./models/comments.js"),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    passportLocalMooose     =   require("passport-local-mongoose"),
    journeysRoutes          =   require("./routes/journeysRoutes.js"),
    commentsRoutes          =   require("./routes/commentsRoutes.js"),
    usersRoutes             =   require("./routes/usersRoutes.js"),
    methodOverride          =   require("method-override");
  


        
var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});
      





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

//mount req.user as currentUser to be used in views/header
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});



app.post("/YelpData",function(req,res){
    console.log(req.body.term);
    console.log(req.body.location);
    yelp.search({ term: req.body.term, location: req.body.location }).then(function (data) {
      console.log(data);
      res.json(data);
      
    });
        

//Return Yelp searches in objects

});

app.get('/',function(req, res){
    res.render("planner/Planner");
});


app.use(journeysRoutes);
app.use(commentsRoutes);
app.use(usersRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Journey has started ");
});