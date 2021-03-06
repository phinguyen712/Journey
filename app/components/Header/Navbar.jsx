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
            <LogIn/>
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
