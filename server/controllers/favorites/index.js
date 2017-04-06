
const  db = require('../../models'),
  saveYelp = require('../yelp').save,
  Yelp = require('yelp'),
  lib = require('../../lib/'),
  yelpKey = require('../../../keys/yelpKey');


const yelp = new Yelp(yelpKey);


module.exports = {

  search(req, res){
    //search API pased on query
    yelp.search(req.body).then(function(yelpData){
      res.json(yelpData);
    }).catch((error)=>{
      res.json(error);
    });
  },

  //delete/add favorites based on wether we have already have them in our db
  toggle(req,res){
    db.User.findById(req.user.id,{
      include: [{
        model: db.Yelp,
        through:'user_favorite',
        as:'favorites'
      }],
    })
    .then((user) => {
      //check if places already exist in user's favorites. If it doesn't,add
      //If it does, remove
      const yelpId = req.body.id,
        favoritesId = user.favorites,
        foundId = favoritesId.indexOf(yelpId);
      if(foundId === -1){
        //save yelp businesses to db
        //update our User's favorites
        saveYelp(req,res,req.body,user)
        .then(()=>{
          lib.findCurrentUser(req,res).then((foundUser)=>{
            let favorites = foundUser.favorites;
            if(favorites != ''){
              favorites = favorites.map((favorites)=>{
                return favorites.business;
              });
            }
            res.json(favorites);
          });
        })
        .catch((error)=>{
          res.status(400).send(error);
        });
      }else{
        let fav  = user.favorites.slice();
        fav.splice(foundId,1);
        user.update({
          favorites: fav
        })
        .then(user =>{
          res.json(user.favorites);
        })
        .catch((error) =>{
          res.status(400).send(error);
        });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  },

};
