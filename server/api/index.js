const  authAPI = require('./auth'),
  userAPI	= require('./user');

module.exports = (app) => {
  authAPI(app),
  userAPI(app);
};
