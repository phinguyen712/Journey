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

export var userLogInReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return action.User;
    default:
      return state;
  };
};

export var userFavoritesReducer = (state = '', action) => {
  switch (action.type) {
    case 'USER_FAVORITES':
      return action.UserFavorites;
    case 'TEMP_REMOVE_FAVORITE':
      return action.deleteIndex;
    case 'TEMP_ADD_FAVORITE':
      return [...state,action.tempFavorites];
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

export var tempJourneyScheduleReducer =(state = [], action)=>{
  switch(action.type){
    case 'ADD_TEMP_JOURNEY_SCHEDULE':
    if(state.length){
    //Add schedule to a specific day in the tempJourneySchedule. each array index
    //represents a schedule
      var stateCopy = state.slice();

      stateCopy.map(function(day,index){
            if(index===(action.day -1)){
              day.schedule.push(action.schedule);
            }
      });

      return stateCopy;
    }else{
      return [{"schedule":[action.schedule]}];
    }
    case 'TEMP_JOURNEY_SCHEDULE':
    
      var stateCopy2 = state.slice();

      stateCopy2[action.day-1].schedule = action.schedule;

      return stateCopy2;
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

export var journeyDistancesReducer =(state = "", action)=>{
  switch(action.type){
    case 'VIEW_CURRENT_JOURNEY_DISTANCES':
      return action.distance;
    default:
      return state;
  }
}
