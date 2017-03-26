
const React = require('react');

var {connect} = require('react-redux');
var actions = require('actions');
var {Link, IndexLink} = require('react-router');


var LogIn = React.createClass({
  render: function () {
    var {User} = this.props;
    console.log(User);
    if(!User){
      return(
        <form className="navbar-form navbar-right" role="search" action="/auth/login" method="POST">
          <div className="login-form form-group">
            <input type="text" className="loginInput" name="username" placeholder="Username"/>
          </div>
          <div className="login-form form-group">
            <input type="password" className="loginInput" name="password" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-nav">Login</button>
          <Link to="/SignUp" activeClassName="active-link">
           Sign Up
          </Link>
        </form>
      )
    }else{
      return(
        <h4 className="navbar-form navbar-right"><p className="navbar-text navbar-right">You are logged in as
           <a id="username" href="/myprofile">  {User}  </a>
           <a href="/auth/logout" className="glyphicon glyphicon-log-out"></a></p></h4>
      )
    }
  }
});

export default connect(
  (state)=>{
    return{
      User:state.User
    }
  }
)(LogIn)
