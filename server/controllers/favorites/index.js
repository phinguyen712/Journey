
const  db = require('../../models'),
  Yelp = require('yelp'),
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

  save(req,res){
    db.Users.findById(req.user.id)
    .then((user) => {
      const yelpId = req.body.id;
      const favoritesId = user.favorites;
      if(favoritesId.indexOf(yelpId) === -1){
        user.update({
          favorites: [...favoritesId,yelpId]
        })
        .then((user)=>{
        })
        .catch((error) =>{
        res.status(400).send(error)
      });
      }
      console.log(error)
    })
    .catch((error) => {
      res.status(400).send(error)});
  }

};
