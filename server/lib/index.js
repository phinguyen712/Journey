const db = require('../models');

module.exports = {
//parse user's data so that our code can read it
//also takes out password before rendering
  userBrowserParse(req, res, user){
    db.User.findById(req.user.id,{
      include: [{
        model: db.Journey,
        as: 'journeys',
      },{
        model: db.Yelp,
        through:'user_favorite',
        as:'favorites'
      }],
    })
    .then((user) =>{
      return sendUserData(req,res,user);
    })
     .catch((error) => {
       res.status(400).send(error);
     });
  },

  //compiles user data to proper format and sends as json to client

};

function sendUserData(req,res,user){
  const userData = {
    'username':user.userName,
    'liked':user.liked,
    'favorites':user.favorites,
    'journeys':user.journeyId,
    'schedule':[]
  };
  res.json(userData);
}
