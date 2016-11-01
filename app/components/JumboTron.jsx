var React = require('react');
var {Link, IndexLink} = require('react-router');

var JumboTron = React.createClass({
  render: function () {
    return (
      <div className="JumboTron" >
        <h1>Adventures Are out there</h1>
        <p>Plan and Share your adventures with Journey</p>
        <Link to="/NewJourney" type="button" className="btn btn-default navbar-btn">New Journey</Link>
       </div>
    );
  }
})

module.exports = JumboTron;
