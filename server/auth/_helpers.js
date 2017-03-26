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

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

function loginRedirect(req, res, next) {
  console.log(req.user);
  console.log("wfawfee")
  if (req.user) {
    return res.status(401).json(
    {status: 'You are already logged in'});
  }
  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect,
};
