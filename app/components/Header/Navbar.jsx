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
        <div className="container-fluid nav-container">
            <a className="navbar-brand navbar-text" href="#">JOURNEY</a>
            <LogIn/>
            <ul className="nav navbar-nav navbar-text">
              <li><IndexLink to="/"  activeStyle={{backgroundColor:'#b6bea8', color:'white'}}>Home</IndexLink></li>
              <li><Link to="/NewJourney" activeStyle={{backgroundColor:'#b6bea8', color:'white'}}iveStyle={{color:'yellow'}}>New Journey</Link></li>
              <li><Link to="/ActivitySearch"activeStyle={{backgroundColor:'#b6bea8', color:'white'}} >Search</Link></li>
              <li><Link to="/Planner" activeStyle={{backgroundColor:'#b6bea8', color:'white'}}>Planner</Link></li>
            </ul>
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
  },null,null,{pure: false}
)(Navbar)
