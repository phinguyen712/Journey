var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');


export var GoogleMapComponent = React.createClass({
  shouldComponentUpdate:function(){
    return false;
  },
  componentWillReceiveProps:function(nextProp){

  },
  componentDidMount:function(){
    this.map = new google.maps.Map(this.refs.map,{
      center:{lat:1,lng:3},
      zoom:8
    });
  },
  render:function(){
    return(
    <div id="map" ref="map"></div>
    )
  }
});

export default connect()(GoogleMapComponent);
