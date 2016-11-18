var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');


export var GoogleMapSearch = React.createClass({
//Only allow component to update once
  shouldComponentUpdate:function(){
    return false;
  },
  markers:function(){
    return []
  },
//only allow update when props recieved
  componentWillReceiveProps:function(nextProp){
    var businesses = nextProp.YelpSearchResults.businesses;
    var center = nextProp.YelpSearchResults.region.center;
    //empty list to refresh
    if(this.markers.length > 0){
       markMap(null,this.markers);
       this.markers.length = 0;
     }

    this.map.setCenter({lat:center.latitude,lng:center.longitude})
    //create array of markers with MarKer()

    this.markers = businesses.map(function(places,i){
              var coordinate = places.location.coordinate;
              return(
                  new google.maps.Marker({
                           position: {lat:coordinate.latitude,
                                      lng:coordinate.longitude
                                      },
                           title: places.name,
                           label: i.toString()
                           })
                   );
               });

   //set markers to map
     markMap(this.map,this.markers);

     function markMap(map,markers){
             for ( var i = 0; i < markers.length; i++ ){
                markers[i].setMap(map);
             }
     };

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
)(GoogleMapSearch);
