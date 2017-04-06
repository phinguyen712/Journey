const  db = require('../../models'),
  lib = require('../../lib/')


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
      .then(() =>{
      //send user with all of their journeys to client
        lib.findCurrentUser(req,res).then((foundUser)=>{
          lib.sendUserToClient(req,res,foundUser);
        });
      })
      .catch((error) =>{
        res.status(400).send(error);
      });
    }else{
      res.json('');
    }
  }
};
