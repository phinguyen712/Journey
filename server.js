const express             =   require('express'),
  app											=		express(),
  bodyParser              =   require('body-parser'),
  auth                    =   require('./server/auth'),
  methodOverride          =   require('method-override'),
  http 										= 	require('http'),
  api								  		=   require('./server/api');



app.use(require('express-session')({
  secret: 'Journey code',
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs' );




//set req.user as currentUser to be used in views/headers
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//this renders all of the client side(React) pages
app.use(express.static('public'));

//settings for passport authorizations, sessions, and hash
auth(app);

//all of the routes aka API
api(app);

//runs server
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});
