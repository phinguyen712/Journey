var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
var Main  = require("Main");
var SignUp = require("SignUp");
var {Provider} = require('react-redux');
var store = require('configureStore').configure();
var actions = require('actions');
import HomePage from 'HomePage';
import NewJourney from 'NewJourney';
import Planner from 'Planner';
import ActivitySearch from 'ActivitySearch';



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
}

refreshUserData();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={HomePage}/>
          <Route path="ActivitySearch" component={ActivitySearch}/>
          <Route path="SignUp" component={SignUp}/>
          <Route path="NewJourney" component={NewJourney}/>
          <Route path="Planner" component={Planner} onEnter={refreshUserData()}/>
        </Route>
    </Router>
  </Provider>
,
  document.getElementById('app')
);
