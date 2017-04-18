const Controller =	require('../../controllers');

module.exports = (app) => {
  app.post('/yelp/search', Controller.yelp.search);
};
