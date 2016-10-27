var React = require('react');
var JumboTron = require('JumboTron');
var {connect} = require('react-redux');
var actions = require('actions');

var HomePage = () => {
  return (
    <div className="container">
      <JumboTron/>
    </div>
  );
}

module.exports = HomePage;
