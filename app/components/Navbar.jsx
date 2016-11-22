var React = require('react');
var {Link, IndexLink} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');
import LogIn from 'LogIn';

var Navbar = React.createClass({
  render: function () {
    var {User} = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <a className="navbar-brand navbar-text" href="#">JOURNEY</a>
            <ul className="nav navbar-nav navbar-text">
              <li><Link to="/" className="active-link">Home</Link></li>
              <li><Link to="/NewJourney" className="active-link">New Journey</Link></li>
              <li><Link to="/ActivitySearch" className="active-link">Search</Link></li>
              <li><Link to="/Planner" className="active-link">Planner</Link></li>
            </ul>
            <h4><p className="navbar-text navbar-right">You are logged in as
            <a id="username" href="/myprofile">  {User.username}  </a>
            <a href="/logout" className="glyphicon glyphicon-log-out"></a></p></h4>
        </div>
      </nav>
    );
  }
})



export default connect(
  (state)=>{
    return{
      User:state.User,
    }
  }
)(Navbar)
