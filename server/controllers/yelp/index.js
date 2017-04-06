const   db = require('../../models');

const self  =  module.exports = {
  save(req,res,yelpBusiness,user){
    //filter out password and change userName prop to user
    return db.Yelp.find({where: {yelpId: yelpBusiness.id}}).
    then((yelp)=>{
      self.setUserFavorite(user,yelp);
    })
    .catch(()=>{
      return db.Yelp.create({
        business:  JSON.stringify(yelpBusiness),
        placeId: yelpBusiness.id,
      }).then((yelp)=>{
        return self.setUserFavorite(user,yelp);
      });
    });
  },

  setUserFavorite(user,yelp){
    return user.setFavorites([yelp]).then((userFavorite)=>{
      return userFavorite;
    });
  }

};
