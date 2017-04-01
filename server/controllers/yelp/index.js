const userBrowserParse = require('../../lib/').userBrowserParse,
  db = require('../../models');

module.exports = {
  save(req,res,yelpBusiness){
    //filter out password and change userName prop to user
    return db.Yelp.find({where: {yelpId: yelpBusiness.id}})
    .then((yelpData)=>{
      console.log('foundID')
      return yelpData.business;
    })
    .catch(()=>{
      const test = JSON.stringify({hello:"its me"});
      db.Yelp.create({
        business: 'asfdsdafdsfsd',
        yelpId: 'sdfsdf'
      })
      .then((yelp) =>{
        console.log(yelp);
        return yelp.business;
      })
      .catch((error) => {
        console.log('failes');
        console.log(error);
        return error;
      });
    });
  }

};
