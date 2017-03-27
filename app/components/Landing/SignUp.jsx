var React = require('react');
var {hashHistory} = require('react-router');
var actions = require('actions');
var {connect} = require('react-redux');

var SignUp = React.createClass({
  createNewUser(e){
      e.preventDefault();
      var {dispatch} = this.props;
      var thisref = this;

      var newUserData={
                      username:thisref.refs.username.value,
                      password:thisref.refs.password.value
      };
      thisref.setState({errorHandle:"Please Wait..."});
      $.ajax({
          type:"POST",
          url:"/auth/signup",
          data:newUserData,
          success:function(response){
            if(response.username){
              dispatch(actions.loggedInUser(response));
              hashHistory.push("/");
            }else{
              thisref.setState({errorHandle:response.err});
            }
          }
      })
  },

  getInitialState(){
     return {errorHandle:""}
  },

  render:function(){
    return (
      <div className="SignUpComponent">
        <h2>Sign Up Page</h2>
        <form className="SignUpForm form-group" onSubmit={this.createNewUser}>
        <div>
          <label for="nameInput">New Username</label>
          <input type="text" className="form-control" id="nameInput" type="text" ref="username" required/>
        </div>
        <div className="form-group">
          <label for="descriptionInput">New Password</label>
          <input className="form-control" id="descriptionInput" type="password" ref="password" required/>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <p>{this.state.errorHandle}</p>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
    }
  }
)(SignUp)
