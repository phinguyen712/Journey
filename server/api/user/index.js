const  Controller = require('../../controllers'),
  authHelpers = require('../../auth/_helpers');


module.exports = (app) => {
  app.post('/user/data', authHelpers.loginRequired, Controller.users.read);
};
