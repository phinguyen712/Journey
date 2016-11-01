var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main  = require("Main");
var ActivitySearch = require("ActivitySearch");
var Planner = require("Planner");
var SignUp = require("SignUp");
var {Provider} = require('react-redux');
var store = require('configureStore').configure();
var actions = require('actions');
import HomePage from 'HomePage';
import NewJourney from 'NewJourney'
require("bootstrap-webpack");


// App css
require('style!css!sass!applicationStyles');
//

  
  fetch('/userdata', {
      credentials : 'same-origin',
    	method: 'GET'
    }).then(function(response){
      return response.json()
    }).then(function(Data){
      store.dispatch(actions.LoggedInUser(Data.foundUser.username));
      console.log(Data.foundUser.username)
  })

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={HomePage}/>
          <Route path="ActivitySearch" component={ActivitySearch}/>
          <Route path="SignUp" component={SignUp}/>
          <Route path="NewJourney" component={NewJourney}/>
        </Route>
    </Router>
    </Provider>,
  document.getElementById('app')
);
