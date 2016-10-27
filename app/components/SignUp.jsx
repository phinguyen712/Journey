var React = require('react');
var SignUp= () => {
  return (
    <div className="SignUpComponent">
      <h2>Sign Up Page</h2>
      <form className="SignUpForm form-group" action="/signup" method="POST">
      <div>
        <label for="nameInput">New Username</label>
        <input type="text" className="form-control" id="nameInput" type="text" name="username" />
      </div>
      <div className="form-group">
        <label for="descriptionInput">New Password</label>
        <input className="form-control" id="descriptionInput" type="password" name="password" />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

module.exports = SignUp;
