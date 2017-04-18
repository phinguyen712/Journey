
const  db = require('../../models'),
  yelp = require('../yelp'),
  lib = require('../../lib/');


const self = module.exports = {

  //*add yelp data to yelp db based on wether it exist in db or not
  //	this is so we dont have to use yelp api everytime we need to render yelp
  //	data with our app
  //*create user_favorites associtation based on wether we have it or not
  toggle(req,res){
    lib.findCurrentUser(req)
    .then((user) => {
      db.Yelp.find({where:{placeId:req.body.id}})
      .then((foundYelp)=>{
        //if yelp already exist in db create/delete association
        if(foundYelp){
          user.hasFavorites([foundYelp.id])
          .then((found)=>{
            if(found){
              self.deleteAssoc(req,res,user,foundYelp);
            }else{
              self.createAssoc(req,res,user,foundYelp);
            }
          })
          .catch((err)=>{
            res.status(500).send(err);
          });
        }else{
           //if yelp Does NOT exit, create yelp in db then create associtaton
          yelp.create(req,res,req.body)
          .then((createdYelp)=>{
            self.createAssoc(req,res,user,createdYelp);
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


  createAssoc(req,res,user,yelp){
    return user.addFavorites([yelp]).then(()=>{
      self.sendFavorites(req,res);
    })
    .catch((err)=>{
      res.status(500).send(err);
    });
  },


  deleteAssoc(req,res,user,yelp){
    return 	user.removeFavorites([yelp.id])
      .then(()=>{
        self.sendFavorites(req,res);
      })
      .catch((err)=>{
        res.status(500).send(err);
      });
  },

  //retrieve user data then send favorites
  sendFavorites(req,res){
    lib.findCurrentUser(req).then((foundUser)=>{
      return res.status(200).send(foundUser.favorites);
    });
  }

};
