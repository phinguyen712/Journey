const Controller			=	 require('../controllers');

module.exports = (app) => {
  app.get('/', function(req, res){
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    });
  });

  app.post('/users/signup', Controller.users.register);
  app.post('/users/login', Controller.users.login);
};
