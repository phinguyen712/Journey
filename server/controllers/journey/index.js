const  db = require('../../models'),
  userBrowserParse = require('../../lib/').userBrowserParse;


module.exports = {
  create(req, res){
    if(req.user){
      db.Journey.create({
        journeyName:req.body.journeyName,
        caption:req.body.caption,
        days:[''],
        publish:false,
        userId:req.user.id
      })
      .then((journey) =>{
      //send user with all of their journeys to client
        userBrowserParse(req,res,journey);
      })
      .catch((error) =>{
        console.log(error);
        res.status(400).send(error);
      });
    }else{
      res.json('');
    }
  }
};
