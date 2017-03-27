
const  Yelp = require('yelp'),
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
  }

};
