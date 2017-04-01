const Controller =	 require('../../controllers');

module.exports = (app) => {
  app.post('/favorites/search', Controller.favorites.search);
  app.put('/favorites/toggle',  Controller.favorites.toggle);
};
