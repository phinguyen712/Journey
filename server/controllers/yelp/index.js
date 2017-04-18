const   db = require('../../models');

module.exports = {
  //save yelp data to Yelp Db
  save(req,res,yelpBusiness){
    //create
    return db.Yelp.create({
      business:  JSON.stringify(yelpBusiness),
      placeId: yelpBusiness.id,
    });
  },

};
