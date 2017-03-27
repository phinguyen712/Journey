const  db = require('../../models');


module.exports = {
  create(req, res){
    if(req.user){
      db.Journey.create({
        journeyName:req.body.journeyName,
        caption:req.body.caption,
        days:[],
        publish:false
      })
      .then((journey) =>{
        res.json(journey);
      })
      .catch((error) =>{
        res.status(400).send(error);
      });
    }else{
      res.json('');
    }
  }
};
