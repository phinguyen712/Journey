const userBrowserParse = require('../../lib/').userBrowserParse;
const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json(statusMsg);
};

module.exports = {
  read(req, res){
    //filter out password and change userName prop to user
    userBrowserParse(req, res,req.user);
  }

};
