const userBrowserParse = require('../../lib/').userBrowserParse;

module.exports = {
  read(req, res){
    //filter out password and change userName prop to user
    userBrowserParse(req, res,req.user);
  }

};
