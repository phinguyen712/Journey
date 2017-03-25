const db = require('../models'),
  authHelpers = require('../auth/_helpers'),
  passport = require('passport');

const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json({status: statusMsg});
};

module.exports = {
  register(req,res){
    return db.Users
    .find({where: {userName: req.body.	username}})
    .then(user =>{
      if(!user) {

        return authHelpers.createUser(req, res)
        .then(()=>{
          passport.authenticate('local', (err, user) => {
            if (user) {
              handleResponse(res, 200, 'success');
            }
          })(req, res);
        })
        .catch((err)=>{
          handleResponse(res,500,err);
        });
      } else {
        res.status(201).send('username already taken');
      }

    });
  },

  login(req, res, next){
    passport.authenticate('local', (err, user) => {
      if (err) {
        handleResponse(res, 500, 'error');
      }
      if (!user) {
        handleResponse(res, 404, 'User not found');
      }
      if (user) {
        req.logIn(user, function (err) {
          if (err) {
            handleResponse(res, 500, 'error');
          }
          handleResponse(res, 200, 'success');
        });
      }
    })(req, res, next);
  },
};
