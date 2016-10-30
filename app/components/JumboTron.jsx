var React = require('react');

var JumboTron = React.createClass({
  render: function () {
    return (
      <div className="JumboTron" >
        <h1>Adventures is out there</h1>
        <p>Plan and Share your adventures with Journey</p>
        <a href="/newJourney" type="button" className="btn btn-default navbar-btn">Create journeys</a>
       </div>
    );
  }
})

module.exports = JumboTron;
