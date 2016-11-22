var React = require('react');
var {Link, IndexLink} = require('react-router');
import LogIn from 'LogIn';

var JumboTron = React.createClass({
  render: function () {
    return (
      <div className="JumboTron" >
        <h1 className="titleText">Plan your next Trip</h1>
        <div>
        <LogIn/>
        </div>
     </div>
    );
  }
})

module.exports = JumboTron;
