const Controller =	 require('../../controllers'),
  authHelpers = require('../../auth/_helpers');

module.exports = (app) => {
  app.post('/auth/signup', authHelpers.loginRedirect, Controller.auth.register);
  app.post('/auth/login', authHelpers.loginRedirect, Controller.auth.login);
  app.get('/auth/logout', authHelpers.loginRequired, Controller.auth.logout);
};
