const handleResponse = (res, code, statusMsg)=>{
  res.status(code).json(statusMsg);
};

module.exports = {
  getData(req, res){
    //filter out password and change userName prop to user
    const u = req.user;
    const userData = {
      'user':u.userName,
      'liked':u.liked,
      'favorites':u.favorites,
      'schedule':[]
    };
    handleResponse(res, 200, userData);
  }

};
