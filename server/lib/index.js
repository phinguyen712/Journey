module.exports = {
//parse user's data so that our code can read it
//also takes out password before rendering
  userBrowserParse(user){
    return  {
      'user':user.userName,
      'liked':user.liked,
      'favorites':user.favorites,
      'schedule':[]
    };
  }
};
