var React = require('react');
var {Link} = require('react-router');
import LogIn from 'LogIn';

var JumboTron = React.createClass({
  render: function () {
    return (
      <div className="JumboTron" >
        <h1 className="titleText">Plan your next Trip</h1>
        <div>
          <Link to="ActivitySearch">
            <button className="btn">Plan Journey</button>

            </Link>
        </div>
     </div>
    );
  }
})

module.exports = JumboTron;
