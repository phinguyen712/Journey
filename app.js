var express                 =   require("express"),
    app                     =   express(),
    $                       =   require("jquery"),
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

//mount req.user as currentUser to be used in views/header
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.get('/',function(req, res){
    res.render("search/search");
});


var matchFavorites= [];//stored data of user favorites

app.get("/planner",function(req,res){
       //find current user
       User.findById(req.user.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            //search yelp for businesses that matches User.favorites
              foundUser.favorites.forEach(function(userFavorites){
                yelp.business(userFavorites).then(function (yelpFavoriteData){
                    //save matched data in array
                    matchFavorites.push(yelpFavoriteData);
                });
             });
        }
    });
   res.render('planner/planner'); 
});

app.post("/planner",function(req,res){
    //send saved array to planner page
     res.json(matchFavorites);
     //reset array after all info is sent
     matchFavorites.length = 0;
});


app.use(journeysRoutes);
app.use(commentsRoutes);
app.use(usersRoutes);
app.use(favoriteRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Journey has started ");
});

