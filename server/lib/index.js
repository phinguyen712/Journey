const db = require('../models');

module.exports = {
//parse user's data so that our code can read it
//also takes out password before rendering
  userBrowserParse(req, res, user){
    db.Users.findById(req.user.id,{
      include: [{
        model: db.Journey,
        as: 'journeyId',
      }],
    })
    .then((user) =>{
      const userData = {
        'username':user.userName,
        'liked':user.liked,
        'favorites':user.favorites,
        'journeys':user.journeyId,
        'schedule':[]
      };

      res.json(userData);
    })
     .catch((error) => {
       res.status(400).send(error);
     });
  }
};
