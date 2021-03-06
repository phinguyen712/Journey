var redux = require('redux');
var {userLogInReducer,
    yelpSearchResultsReducer,
    userFavoritesReducer,
    searchCoordinatesReducer,
    journeyScheduleReducer,
    journeyDayReducer,
    journeyDistancesReducer,
    tempJourneyScheduleReducer,
    mapCenterLocation} = require('reducers');



export var configure = (initialState = {}) => {
  //Combine all reducers into one
  var reducer = redux.combineReducers({
    User:userLogInReducer,
    YelpSearchResults:yelpSearchResultsReducer,
    UserFavorites:userFavoritesReducer,
    SearchCoordinates:searchCoordinatesReducer,
    JourneySchedule:journeyScheduleReducer,
    CurrentJourneyDay:journeyDayReducer,
    CurrentJourneyDistances:journeyDistancesReducer,
    TempJourney:tempJourneyScheduleReducer,
    GeoLocation:mapCenterLocation
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
//for developer tools
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
