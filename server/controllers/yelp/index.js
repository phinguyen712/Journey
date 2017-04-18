const   db = require('../../models'),
  Yelp = require('yelp'),
  yelpKey = require('../../../keys/yelpKey');

const yelpAPI = new Yelp(yelpKey);

module.exports = {
  //save yelp data to Yelp Db
  create(req,res,yelpBusiness){
    return db.Yelp.create({
      business:  JSON.stringify(yelpBusiness),
      placeId: yelpBusiness.id,
    });
  },

  search(req, res){
    return yelpAPI.search(req.body).then(function(yelpData){
      res.json(yelpData);
    }).catch((error)=>{
      res.json(error);
    });
  }
};
