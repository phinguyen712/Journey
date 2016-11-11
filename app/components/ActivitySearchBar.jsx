var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchBar = React.createClass({
//sesarch Yelp based on query and return results/coordinates
  onSubmit: function(e){
    var {dispatch} = this.props;
    e.preventDefault();
    var term = this.refs.term.value;
    var location = this.refs.location.value;
    $.ajax({
        type: "POST",
        url: "/favorites",
        data: {term:term, location:location},
        dataType:"json",
        success: function(yelpSearchResults){
          //Store yelp data into reducer to display search results
          dispatch(actions.yelpSearch(yelpSearchResults));
          //put coordinate in reducer for GoogleMap
          var coordinates = yelpSearchResults.businesses.map(function(yelpPlaces){
            return yelpPlaces.location.coordinate;
          })
          var centerCoordinates= yelpSearchResults.region.center;

          dispatch(actions.yelpSearchCoordinate(coordinates,centerCoordinates));
        }
   })
 },

  render:function(){
    return(
        <form className="Navbar-form" onSubmit={this.onSubmit}>
        <div id="search">
            <input type="text" ref="term" className="searchBox" placeholder="Name of Place,Trails....."/>
            <input type="text" ref="location" className="searchBox" placeholder="Location"/>
        </div>
            <button type="submit" id="testbutton" className="btn btn-default">Search</button>
        </form>
    )
  }
});

export default connect()(ActivitySearchBar);
