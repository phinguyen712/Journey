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


//send Yelp API data to planner page
app.post("/favorites",function(req,res){
    //search businesses with yelp API
    yelp.search({ term: req.body.term, location: req.body.location }).then(function (yelpData) {
   
        
   
     User.findById(req.user.id, function(err,currentUserDocument){
         
         if(err){
             console.log(err);
         }else{
      
             //create a poperty for displaying heart as red or empty(if users have already added the yelp location
             //to their favorite or not)
             for( var x = 0; x < yelpData.businesses.length ; x++) {
                

                for(var i = 0; i <currentUserDocument.favorites.length; i++ ) {
                    
                    if(yelpData.businesses[x].id == currentUserDocument.favorites[i]){
                       
                        yelpData.businesses[x].heartOn="true"; 
                  
                    }else{}
               
                }
                   
         }
         
         }
             
           res.json(yelpData);
     });    
   
    });
});    
    
    
app.get("/favorites", function(req,res){

    User.findById(req.user.id,function(err,favoritesData){
        
        if(err){
            console.log(err);
        }
            console.log(favoritesData.favorites);
            res.json(favoritesData.favorites);
    });
});    
    
    
app.post("/favorites/save",function(req,res){

    User.findById(req.user.id,function(err,userAccount){
        if(err){
            console.log(err);
        }else if(!userAccount.favorites){
            userAccount.favorites = req.body.id;
            console.log(userAccount);

        }else{
            userAccount.favorites.push(req.body.id);
            userAccount.save(); 
            console.log(userAccount);
        }
        res.json(userAccount);
    });
});


//remove favorites from Users
app.delete("/favorites/delete",function(req,res){
console.log('delete');
     User.update({"_id": req.user.id}, {$pull: {"favorites": req.body.id}}, function(err, removedFavorites){
        if(err){
            console.log(err);
        }else{
            console.log(removedFavorites);
            User.findById(req.user.id, function(err,newData){
                if(err){
                    console.log(err);
                }else{
                    console.log(newData);
                     res.json(newData);
                }
            });
            
            
        }
        });

       
    
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