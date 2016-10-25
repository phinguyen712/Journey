var React = require('react');

var HomePage = () => {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand " href="#">JOURNEY</a>
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">Home</a></li>
              <li><a href="/newJourney">1.New Journey</a></li>
              <li><a href="/search">2.Search</a></li>
              <li><a href="/planner">3.Planner</a></li>
            </ul>
           <form className="navbar-form navbar-right" role="search" action="/login" method="POST">
              <div className="form-group">
                <label className="sr-only" form="exampleInputEmail3">Email address</label>
                <input type="text" className="form-control" id="exampleInputEmail3" name="username" placeholder="Username"/>
              </div>
              <div className="form-group">
                <label className="sr-only" for="exampleInputPassword3">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword3" name="password" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-default">login</button>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target=".signUp">Sign Up</button>
              </form>
            </div>
        </nav>
    </div>
  );
}

module.exports = HomePage;
