const db = require('../../models'),
  authHelpers = require('../../auth/_helpers'),
  lib = require('../../lib/'),
  passport = require('passport');

const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json(statusMsg);
};

module.exports = {
  register(req,res){
    return db.User
    .find({where: {userName: req.body.username}})
    .then(user =>{
      if(!user) {
        return authHelpers.createUser(req, res)
        .then(()=>{
          passport.authenticate('local', (err, user) => {
            if (user) {
              req.logIn(user, function (err) {
                if (err) {
                  handleResponse(res, 500, {err: err});
                }else{
                  lib.findCurrentUser(req,res).then((foundUser)=>{
                    lib.sendUserToClient(req,res,foundUser);
                  }).
                 catch((error)=>{
                   res.status(400).send(error);
                 });
                }
              });
            }
          })(req, res);
        })
        .catch((err)=>{
          handleResponse(res,500,err);
        });
      } else {
        res.status(201).send({err:'username taken'});
      }

    });
  },

  login(req, res, next){
    passport.authenticate('local', (err, user) => {
      if (err) {
        handleResponse(res, 500, {err:'error'});
      }
      if (!user) {
        handleResponse(res, 404, 'user not found');
      }
      if (user) {
        req.logIn(user, function (err) {
          if (err) {
            handleResponse(res, 500, {err: err});
          }
          res.status(200).redirect('/');
        });
      }
    })(req, res, next);
  },

  logout(req, res){
    req.logout();
    handleResponse(res,200,'logged out');
  }

};
