var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navbar = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand " href="#">JOURNEY</a>
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/" activeClassName="active-link">Home</Link></li>
              <li><Link to="/NewJourney" activeClassName="active-link">New Journey</Link></li>
              <li><Link to="/ActivitySearch" activeClassName="active-link">Search</Link></li>
              <li><Link to="/Planner" activeClassName="active-link">Planner</Link></li>
            </ul>
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
              <button type="button" className="btn btn-default" data-toggle="modal" data-target=".signUp">Sign Up</button>
              </form>
            </div>
        </nav>
    );
  }
})

module.exports = Navbar;
