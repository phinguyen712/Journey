const db = require('../models');

module.exports = {
//parse user's data so that our code can read it
//also takes out password before rendering

  findCurrentUser(req){
    return db.User.findById(req.user.id,{
      include: [{
        model: db.Journey,
        as: 'journeys',
      },{
        model: db.Yelp,
        through:'user_favorite',
        as:'favorites'
      }],
    })
    .then((user)=>{
      user.favorites = user.favorites.map((favorite)=>{
        return JSON.parse(favorite.business);
      });
      return user;
    });
  },

  //compiles user data to proper format and sends as json to client
  sendUserToClient(req, res, user){
    const userData = {
      'username':user.userName,
      'liked':user.liked,
      'favorites':user.favorites,
      'journeys':user.journeyId,
      'schedule':[]
    };
    res.json(userData);
  }

};
