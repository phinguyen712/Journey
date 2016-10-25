var React = require('react');
var ReactDOM = require('react-dom');
var HomePage = require('HomePage');
var Navbar = require('Navbar');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
require("bootstrap-webpack");

// App css


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}/>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route path="countdown" component={Countdown}/>
          <IndexRoute component={Timer}/>
        </Route>
      </Router>,
  </Router>,
  document.getElementById('app')
);
