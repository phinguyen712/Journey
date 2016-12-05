var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
var {Provider} = require('react-redux');
var store = require('configureStore').configure();
var actions = require('actions');
import Main from 'Main';
import HomePage from 'HomePage';
import NewJourney from 'NewJourney';
import Planner from 'Planner';
import ActivitySearch from 'ActivitySearch';
import SignUp from 'SignUp'



// App css
require('style!css!sass!applicationStyles');
//
var refreshUserData =(callback)=>{
    var tempUserState ={
      favorites:store.getState().UserFavorites,
      user:store.getState().User,
      schedule:store.getState().JourneySchedule
    }
    $.ajax({
     type: "POST",
     url: "/user/data",
     data: tempUserState,
     dataType:"json",
     success:function(userData){
       store.dispatch(actions.loggedInUser(userData.user));
       store.dispatch(actions.userFavorites(userData.favorites));
       store.dispatch(actions.JourneySchedule(userData.schedule));
       callback();
     }
   });
};

refreshUserData();

export const getRoutes=(store)=>{
  var userFavoritesCheck = (nextState,replace,callback)=>{

    var userFavorites = store.getState().UserFavorites,
        user          = store.getState().User

      //wait for ASYNC to complete
      //keeps users on the same page when refresh
    var replaceRoutes =(alertMessage,newRoute)=> {
      alert(alertMessage,newRoute);
        replace({
             pathname: newRoute,
             state: { nextPathname: nextState.location.pathname }
        });
    }

    if(!userFavorites || !user){
      refreshUserData(function(){
        if(!userFavorites){
          replaceRoutes("Please add favorites!","ActivitySearch");
        }
        if(!user){
            replaceRoutes("Please create a new Journey","NewJourney")
          }
        callback();
      });

    }
  };

  return(
      <Route path="/" component={Main}>
        <IndexRoute component={HomePage}/>
        <Route path="ActivitySearch" component={ActivitySearch} />
        <Route path="SignUp" component={SignUp}/>
        <Route path="NewJourney" component={NewJourney}/>
        <Route path="Planner" component={Planner}
            onEnter={userFavoritesCheck}/>
      </Route>
  )
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {getRoutes(store)}
    </Router>
  </Provider>
,
  document.getElementById('app')
);
