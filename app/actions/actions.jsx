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

export var addTempFavorites = (tempFavorites)=>{
  return{
    type:'TEMP_ADD_FAVORITE',
    tempFavorites
  }
}

export var removeTempFavorites = (deleteIndex)=>{
  return{
    type:'TEMP_REMOVE_FAVORITE',
    deleteIndex
  }
}

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

export var addTempJourneySchedule = (schedule,day)=>{
  return{
    type:'ADD_TEMP_JOURNEY_SCHEDULE',
    schedule,
    day
  }
}

export var TempJourneySchedule = (schedule,day)=>{
  return{
    type:'TEMP_JOURNEY_SCHEDULE',
    schedule,
    day
  }
}

export var addTempDay = (tempDay)=>{
  return{
    type:'ADD_TEMP_DAY',
    tempDay
  }
}

export var DeleteTempJourneySchedule = (index,day)=>{
  return{
    type:'DELETE_TEMP_JOURNEY_SCHEDULE',
    index,
    day
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
