const  authRoutes = require('./auth');

module.exports = (app) => {
  app.get('/', function(req, res){
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    });
  });
  //routes for  users signup/login/logout
  authRoutes(app);

};
