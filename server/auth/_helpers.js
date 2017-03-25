const bcrypt = require('bcryptjs'),
  db = require('../models');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req,res){
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.Users.create({
    userName: req.body.username,
    password: hash
  })
  .then((user) =>{
    return user;
  })
  .catch(error => res.status(400).send(error));
}

module.exports = {
  comparePass,
  createUser
};
