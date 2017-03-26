const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  authHelpers = require('./_helpers'),
  db =	require('../models');

module.exports = (app)  =>{
  //initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Use local strategy to create user account
  passport.use(new LocalStrategy(
    function(username, password, next) {
      return db.Users.findOne({ where: { userName: username }})
      .then((user)=>{
        if (!user) {
          return next(null,false);
        } else if(!authHelpers.comparePass(password, user.password)) {
          return next(null,false);
        } else {
          return next(null, user);
        }
      }).error((err)=>{
        return next(err);
      });
    }
  ));

  // Serialize sessions
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    db.Users.find({where: {id: id}})
    .then((user)=>{
      done(null, user);
    })
    .error(function(err){
      done(err, null);
    });
  });

};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
