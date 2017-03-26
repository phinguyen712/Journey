const  data = require('./data');

module.exports = (app) => {
  app.use('/user', data);
};
