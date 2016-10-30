export var LoggedInUser = (User) => {
  return {
    type: 'LOGGED_IN_USER',
    User
  };
};
