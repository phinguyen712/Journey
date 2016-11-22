var React = require('react');
var JumboTron = require('JumboTron');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link, IndexLink} = require('react-router');


var LogIn = React.createClass({
  render: function () {
    var {User} = this.props;
    if(!User){
      return(
      <div className="SignUpComponent">
        <form className="SignUpForm" role="search" action="/login" method="POST">
          <div className="form-group">
            <label className="sr-only" form="exampleInputEmail3">Email address</label>
            <input type="text" className="form-control" id="exampleInputEmail3" name="username" placeholder="Username"/>
          </div>
          <div className="form-group">
            <label className="sr-only" form="exampleInputPassword3">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword3" name="password" placeholder="Password"/>
          </div>
            <button type="submit" className="logIn btn btn-default">login</button>
          <div>
          <Link to="/SignUp" activeClassName="active-link">
            <button type="button" className="signUp btn btn-default">
              Sign Up
            </button>
          </Link>
          </div>
        </form>
      </div>
      )
    }else{
      return(
        <Link to="/NewJourney" type="button" className="btn btn-default navbar-btn">New Journey</Link>
      )
    }
  }
});

export default connect(
  (state)=>{
    return{
      User:state.User.username
    }
  }
)(LogIn)
