var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');


export var GoogleMapComponent = React.createClass({
//Only allow component to update once
  shouldComponentUpdate:function(){
    return false;
  },
  markers:function(){
    return []
  },
//only allow update when props recieved
  componentWillReceiveProps:function(nextProp){
        //load in waypoints

  },

  componentDidMount:function(){
    this.markers = [];
    this.map = new google.maps.Map(this.refs.map,{
      center:{lat: -34.39,lng:150.644},
      zoom:12
    });
  },

  render:function(){
    return(
    <div id="map" ref="map"></div>
    )
  }
});

export default connect(
  (state)=>{
    return{
      YelpSearchResults:state.YelpSearchResults
    }
  }
)(GoogleMapComponent);
