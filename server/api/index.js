const  authAPI = require('./auth'),
  userAPI	= require('./user'),
  journeyAPI	= require('./journey'),
  yelpAPI = require('./yelp'),
  favoritesAPI = require('./favorites');

module.exports = (app) => {
  authAPI(app);
  userAPI(app);
  journeyAPI(app);
  favoritesAPI(app);
  yelpAPI(app);
};
