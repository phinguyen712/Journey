var React = require('react');
var {Link} = require('react-router');

var JumboTron = React.createClass({
  render: function () {
    return (
      <div className="JumboTron" >
        <h4 className = "logInError">Wrong username or password</h4>
        <h1 className="titleText">Plan your next Trip</h1>
        <div>
          <Link to="NewJourney">
            <button className="btn">Plan Journey</button>
          </Link>
        </div>
     </div>
    );
  }
})
module.exports = JumboTron;
