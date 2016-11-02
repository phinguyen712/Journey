export var loggedInUser = (User) => {
  return {
    type: 'LOGGED_IN_USER',
    User
  };
};

export var yelpSearch = (YelpSearchResults) => {
  return {
    type: 'YELP_SEARCH',
    YelpSearchResults
  };
};

export var userFavorites = (userFavorites) => {
  return {
    type: 'USER_FAVORITES',
    userFavorites
  };
};
