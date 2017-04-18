const lib = require('../../lib/');

module.exports = {
  read(req, res){
    //filter out password and change userName prop to user
    lib.findCurrentUser(req, res).then((foundUser)=>{
      lib.sendUserToClient(req, res, foundUser);
    }).
    catch((error)=>{
      res.status(400).send(error);
    });
  }

};
