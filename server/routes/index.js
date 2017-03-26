const Controller			=	 require('../controllers'),
  authHelpers = require('../auth/_helpers');

module.exports = (app) => {
  app.get('/', function(req, res){
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    });
  });

  app.post('/users/signup', authHelpers.loginRedirect, Controller.users.register);
  app.post('/users/login', authHelpers.loginRedirect, Controller.users.login);
};
