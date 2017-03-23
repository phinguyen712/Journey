var express                 =   require('express'),
	app                     =   express(),
	mongoose                =   require('mongoose'),
	bodyParser              =   require('body-parser'),
	flash                   =   require('connect-flash'),
	passport                =   require('passport'),
	LocalStrategy           =   require('passport-local'),
	methodOverride          =   require('method-override');



app.use(require('express-session')({
	secret: 'Journey code',
	resave: false,
	saveUninitialized: false
}));

app.use(express.static('public'));

app.use(flash());

app.use(methodOverride('_method'));



app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs' );

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//decode and endcode sessions for Authorization
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


//set req.user as currentUser to be used in views/headers
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

const port = process.env.PORT || '3000';
//var url = process.env.DATABASEURL || 'mongodb://localhost:27017/Journey';

//mongoose.connect(url);






app.listen(port,function(){
	console.log('Journey has started port'+ port);
});
