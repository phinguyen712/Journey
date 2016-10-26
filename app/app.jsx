var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var HomePage = require('HomePage');
var Navbar = require('Navbar');
var Main  = require("Main");
var ActivitySearch = require("ActivitySearch");
var NewJourney = require("NewJourney");
var Planner = require("Planner");

require("bootstrap-webpack");

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={HomePage}/>
      <Route path="ActivitySearch" component={ActivitySearch}/>
      <Route path="NewJourney" component={NewJourney}/>
      <Route path="Planner" component={Planner}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
