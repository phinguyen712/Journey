const Controller			=	 require('../../controllers'),
  authHelpers = require('../../auth/_helpers');

module.exports = (app) => {
  app.post('/auth/signup', authHelpers.loginRedirect, Controller.users.register);
  app.post('/auth/login', authHelpers.loginRedirect, Controller.users.login);
  app.get('/auth/logout', authHelpers.loginRequired, Controller.users.logout);
};
