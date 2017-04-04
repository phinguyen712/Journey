const userBrowserParse = require('../../lib/').userBrowserParse,
  db = require('../../models');

module.exports = {
  save(req,res,yelpBusiness){
    //filter out password and change userName prop to user
    return db.Yelp.find({where: {yelpId: yelpBusiness.id}})
    .then((yelpData)=>{
      return yelpData.business;
    })
    .catch(()=>{
      db.Yelp.create({
        business:  JSON.stringify(yelpBusines),
        yelpId: yelpBusiness.id
      })
      .then((yelp) =>{
        return yelp.business;
      })
      .catch((error) => {
        return error;
      });
    });
  }

};
