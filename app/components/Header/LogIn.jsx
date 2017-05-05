
var React = require('react');
var JumboTron = require('JumboTron');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link, IndexLink,browserHistory} = require('react-router');


var LogIn = React.createClass({
  login: function(){
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    $.ajax({
      type: 'POST',
      url: '/login',
      data: {username:username,password:password},
      dataType:'json',
      success:(re)=>{
        if(!re.username){
          return $(".logInError").css('display','block');
        }else{
          browserHistory.push('/');
        }
      }
    });

  },

  render: function () {
    var {User} = this.props;
    if(!User){
      return(
        <div className = "navbar-right">
          <form className="navbar-form" onSubmit={this.login} role="search">
            <div className="login-form form-group">
              <input type="text" className="loginInput" ref='username' placeholder="Username"/>
            </div>
            <div className="login-form form-group">
              <input type="password" className="loginInput" ref="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-nav">Login</button>
          </form>
          <Link className = "signUpLink" to="/SignUp" >
           Sign Up
          </Link>
        </div>
      )
    }else{
      return(
        <h4 className="navbar-form navbar-right"><p className="navbar-text navbar-right">You are logged in as
           <a id="username">  {User}  </a>
           <a href="/logout" className="glyphicon glyphicon-log-out"></a></p></h4>
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
