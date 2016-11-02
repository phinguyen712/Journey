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
        <form className="navbar-form navbar-right" role="search" action="/login" method="POST">
          <div className="form-group">
            <label className="sr-only" form="exampleInputEmail3">Email address</label>
            <input type="text" className="form-control" id="exampleInputEmail3" name="username" placeholder="Username"/>
          </div>
          <div className="form-group">
            <label className="sr-only" form="exampleInputPassword3">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword3" name="password" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-default">login</button>
          <Link to="/SignUp" activeClassName="active-link">
            <button type="button" className="btn btn-default">
              Sign Up
            </button>
          </Link>
        </form>
      )
    }else{
      return(
        <h4 className="navbar-form navbar-right"><p className="navbar-text navbar-right">You are logged in as
           <a id="username" href="/myprofile">  {User}</a>
           <a href="/logout" className="glyphicon glyphicon-log-out"></a></p></h4>
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
