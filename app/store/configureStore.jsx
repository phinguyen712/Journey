var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');



export var configure = (initialState = {}) => {
  //Combine all reducers into one
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
//for developer tools
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
