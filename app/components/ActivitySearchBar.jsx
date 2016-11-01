var React = require('react');
var JumboTron = require('JumboTron');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchBar = () =>{
  return(
      <form className="Navbar-form" >
      <div id="search">
          <input type="text" className="searchBox" id="term"  placeholder="Name of Place,Trails....."/>
          <input type="text" className="searchBox" id="location"  placeholder="Location"/>
      </div>
          <button type="button" id="testbutton" className="btn btn-default">Search</button>
      </form>
  )
}


export default connect()(ActivitySearchBar);
