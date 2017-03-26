const  Controller = require('../../controllers'),
  authHelpers = require('../../auth/_helpers');
let app = require('express')();

app.post('/data', authHelpers.loginRequired, Controller.users.getData);

module.exports = app;
