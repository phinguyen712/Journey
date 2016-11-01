export var LoggedInUser = (User) => {
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
