
const  db = require('../../models'),
  saveYelp = require('../yelp').save,
  Yelp = require('yelp'),
  lib = require('../../lib/'),
  yelpKey = require('../../../keys/yelpKey');

const yelp = new Yelp(yelpKey);

const self = module.exports = {

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
    lib.findCurrentUser(req)
    .then((user) => {
      //check if places already exist in user's favorites. If it doesn't,add
      //If it does, remove
      db.Yelp.find({where:{placeId:req.body.id}})
      .then((foundYelp)=>{
        if(foundYelp){
          user.hasFavorites([foundYelp.id])
          .then((found)=>{
            if(found){
              user.removeFavorites([foundYelp.id]).
              then(()=>{
                self.sendFavorites(req,res);
              })
              .catch((err)=>{
                res.status(500).send(err);
              });
            }else{
              self.assocSendFavUser(req,res,user,foundYelp);
            }
          })
          .catch((err)=>{
            res.status(500).send(err);
          });
        }else{
          saveYelp(req,res,req.body)
          .then((createdYelp)=>{
            self.assocSendFavUser(req,res,user,createdYelp);
          })
          .catch((err)=>{
            res.status(500).send(err);
          });
        }
      })
      .catch((err)=>{
        res.status(400).send(err);
      });
    });
  },

  assocSendFavUser(req,res,user,yelp){
    self.assocUserFavorite(user,yelp).then(()=>{
      self.sendFavorites(req,res);
    });
  },


  sendFavorites(req,res){
    lib.findCurrentUser(req).then((foundUser)=>{
      return res.status(200).send(foundUser.favorites);
    });
  },


  assocUserFavorite(user,yelp){
    return user.addFavorites([yelp]);
  }


};


// const listOfFavId = user.favorites.map((fav)=>{
// 	return fav.placeId;
// });
//
// const index = listOfFavId.indexOf(req.body.id);
//
// if(index === -1){
// 	//save yelp businesses to db
// 	//update our User's favorites
// 	saveYelp(req,res,req.body,user)
// 	.then(()=>{
// 		lib.findCurrentUser(req,res).then((foundUser)=>{
// 			let favorites = foundUser.favorites;
// 			if(favorites != ''){
// 				favorites = favorites.map((favorites)=>{
// 					return favorites.business;
// 				});
// 			}
// 			res.send(favorites);
// 		});
// 	})
// 	.catch((error)=>{
// 		res.status(400).send(error);
// 	});
// }else{
// 	return user.removeFavorites([{where:{businessId:req.body.id}}])
// 	.then((removed)=>{
// 		console.log(removed);
// 	})
// 	.catch((err)=>{
// 		console.log(err);
// 	});
// }
// })
// .catch((error) => {
// res.status(400).send(error);
// });
