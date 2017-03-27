const  Controller = require('../../controllers');


module.exports = (app) => {
  app.post('/journey/create',Controller.journey.create);
};
