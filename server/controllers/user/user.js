const db = require('../models'),
  authHelpers = require('../auth/_helpers'),
  passport = require('passport');

const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json({status: statusMsg});
};

module.exports = {
  getInfo(req, res){
    req.logout();
    handleResponse(res, 200, 'success');
  }

};
