const Controller =	 require('../../controllers'),
  authHelpers = require('../../auth/_helpers');

module.exports = (app) => {
  app.post('/favorites/search', Controller.favorites.search);
  app.post('/favorites/save',  Controller.favorites.save);
};
