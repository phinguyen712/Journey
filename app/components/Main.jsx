var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <a class="navbar-brand " href="#">JOURNEY</a>
            <ul class="nav navbar-nav">
              <li class="active"><a href="/">Home</a></li>
              <li><a href="/newJourney">1.New Journey</a></li>
              <li><a href="/search">2.Search</a></li>
              <li><a href="/planner">3.Planner</a></li>
            </ul>
           <form class="navbar-form navbar-right" role="search" action="/login" method="POST">
              <div class="form-group">
                <label class="sr-only" for="exampleInputEmail3">Email address</label>
                <input type="text" class="form-control" id="exampleInputEmail3" name="username" placeholder="Username"/>
              </div>
              <div class="form-group">
                <label class="sr-only" for="exampleInputPassword3">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword3" name="password" placeholder="Password"/>
              </div>
              <button type="submit" class="btn btn-default">login</button>
              <button type="button" class="btn btn-default" data-toggle="modal" data-target=".signUp">Sign Up</button>
              </form>
            </div>
        </nav>
    );
  }
})

module.exports = Navbar;
