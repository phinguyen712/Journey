var express                 =   require("express"),
    app                     =   express(),
    mongoose                =   require("mongoose"),
    bodyParser              =   require("body-parser"),
    User                    =   require("./models/users.js"),
    flash                   =   require("connect-flash"),
    journeys                =   require("./models/journeys.js"),
    passport                =   require("passport"),
    LocalStrategy           =   require("passport-local"),
    journeysRoutes          =   require("./routes/journeysRoutes.js"),
    commentsLikesRoutes     =   require("./routes/commentsLikesRoutes.js"),
    usersRoutes             =   require("./routes/usersRoutes.js"),
    searchRoutes            =   require("./routes/searchRoutes.js"),
    plannerRoutes           =   require("./routes/plannerRoutes.js"),
    methodOverride          =   require("method-override");



app.use(require("express-session")({
    secret: "Journey code",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));

app.use(flash());

app.use(methodOverride("_method"));


const port = process.env.PORT || "3000";
mongoose.connect('mongodb://localhost:27017/Journey');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs" );

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//decode and endcode sessions for Authorization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//set req.user as currentUser to be used in views/headesr
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(plannerRoutes);
app.use(journeysRoutes);
app.use(commentsLikesRoutes);
app.use(usersRoutes.router);
app.use(searchRoutes);


app.listen(port,function(){
    console.log('Journey has started port'+ port);
});
