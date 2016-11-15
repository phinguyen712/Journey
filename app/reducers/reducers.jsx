var uuid = require('node-uuid');

//Reducers manipulate state based on action called.(this is how actions are executed)
//Reducers can cal objections based on actions
//Reducers have to be pure functions

export var yelpSearchResultsReducer = (state = '', action) => {
  switch (action.type) {
    case 'YELP_SEARCH':
      return action.YelpSearchResults;
    default:
      return state;
  };
};

export var userLogInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return action.User;
    default:
      return state;
  };
};

export var userFavoritesReducer = (state = "false", action) => {
  switch (action.type) {
    case 'USER_FAVORITES':
      return action.UserFavorites;
    default:
      return state;
  };
};

export var searchCoordinatesReducer =(state = '', action)=>{
  switch(action.type){
    case 'UPDATE_SEARCH_COORDINATES':
      return {coordinates:action.Coordinates,
              centerCoordinates:action.CenterCoordinates
            };
    default:
      return state;
  };
};


export var journeyScheduleReducer =(state = '', action)=>{
  switch(action.type){
    case 'UPDATE_JOURNEY_SCHEDULE':
      return action.schedule;
    default:
      return state;
  };
};

export var journeyDayReducer =(state = 1, action)=>{
  switch(action.type){
    case 'VIEW_CURRENT_JOURNEY_DAY':
      return action.day;
    default:
      return state;
  }
}
