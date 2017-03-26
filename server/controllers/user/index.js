const userBrowserParse = require('../../lib/').userBrowserParse;
const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json(statusMsg);
};

module.exports = {
  getData(req, res){
    //filter out password and change userName prop to user
    handleResponse(res, 200, userBrowserParse(req.user));
  }

};
