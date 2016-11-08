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

export var userFavorites = (UserFavorites) => {
  return {
    type: 'USER_FAVORITES',
    UserFavorites
  };
};

export var yelpSearchCoordinate = (Coordinates,CenterCoordinates)=>{
  return{
    type:'UPDATE_SEARCH_COORDINATES',
    Coordinates,
    CenterCoordinates
  }
}

export var yelpSearchCoordinateCenter = (Coordinates)=>{
  return{
    type:'UPDATE_SEARCH_COORDINATES_Center',
    Coordinates
  }
}
