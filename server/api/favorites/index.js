const Controller =	require('../../controllers');

module.exports = (app) => {
  app.put('/favorites/toggle', Controller.favorites.toggle);
};
