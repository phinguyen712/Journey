var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchBar = React.createClass({
//sesarch Yelp based on query and return results/coordinates
  onSubmit: function(e){
    e.preventDefault();
    var {dispatch, geolocation} = this.props;
    var term = this.refs.term.value;
    var location = this.refs.location.value;
    var searchQuery;

    if(!this.refs.location.value){
      location =  geolocation.lat+','+geolocation.lng;
    }

    searchQuery={term:term , limit:10 ,location:location};
    $.ajax({
      type: "POST",
      url: "/yelp/search",
      data: searchQuery,
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
            <input type="text" ref="location" className="searchBox" placeholder="Location" />
        </div>
            <button type="submit" id="testbutton"
              className=" glyphicon glyphicon-search btn btn-default"></button>
        </form>
    )
  }
});

export default connect(
  (state)=>{
    return{
      User:state.User.username,
      geolocation:state.GeoLocation
    }
}
)(ActivitySearchBar)
