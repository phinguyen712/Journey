const  authAPI = require('./auth'),
  userAPI	= require('./user'),
  journeyAPI	= require('./journey');

module.exports = (app) => {
  authAPI(app);
  userAPI(app);
  journeyAPI(app);
};
