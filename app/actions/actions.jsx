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

export var JourneySchedule = (schedule)=>{
  return{
    type:'UPDATE_JOURNEY_SCHEDULE',
    schedule
  }
}

export var CurrentJourneyDay = (day)=>{
  return{
    type:'VIEW_CURRENT_JOURNEY_DAY',
    day
  }
}

export var CurrentJourneyDistance = (distance)=>{
  return{
    type:'VIEW_CURRENT_JOURNEY_DISTANCES',
    distance
  }
}
