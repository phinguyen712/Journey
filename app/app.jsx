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

var refreshUserData =()=>{
    $.ajax({
     type: "GET",
     url: "/user/favorites",
     dataType:"json",
     success:function(userData){
       store.dispatch(actions.loggedInUser(userData.user));
       store.dispatch(actions.userFavorites(userData.favorites));
     }
   });
};

refreshUserData();

export const getRoutes=(store)=>{

  var authorizeUser = (nextState,replace)=>{
    var User = !store.getState().User
      if(!User){
      //wait for ASYNC to complete
      //keeps users on the same page when refresh
        setTimeout(function(){
          if(!User){
            console.log(User);
              replace({
                   pathname: '/',
                   state: { nextPathname: nextState.location.pathname }
              });
          }
        },1000);
          }

  };

  return(
      <Route path="/" component={Main}>
        <IndexRoute component={HomePage}/>
        <Route path="ActivitySearch" component={ActivitySearch} />
        <Route path="SignUp" component={SignUp}/>
        <Route path="NewJourney" component={NewJourney}/>
        <Route path="Planner" component={Planner}/>
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
