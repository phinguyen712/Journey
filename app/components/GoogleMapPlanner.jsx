var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');


export var GoogleMapPlanner = React.createClass({
//Only allow component to update once
  shouldComponentUpdate:function(){
    return false;
  },

  componentDidMount:function(){

    this.markers = [];

    this.map = new google.maps.Map(this.refs.map,{
      center:{lat: -34.39,lng:150.644},
      zoom:12
    });
  },

  //only allow update when props recieved
componentWillReceiveProps:function(nextProp){
      this.calculateRoutes(nextProp.journeySchedule);
},

//
 calculateRoutes:function(schedule){

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var waypts = [] ;
      var originpts;
      var endpts;

      for( var i = 0 ; i< schedule.length ; i++){
          var lats    = schedule[i].location.coordinate.latitude;
          var longs   = schedule[i].location.coordinate.longitude;

          if( i == 0){
              originpts = ""+lats+","+longs+"" ;
         }else if( i == schedule.length - 1){
             endpts= ""+lats+","+longs+"";
             this.displayRoutes(directionsService,directionsDisplay,originpts,waypts,endpts);
          }else{
               waypts.push({location:""+lats+","+longs+"" , stopover: true});
          }
      };
  },

  displayRoutes:function(directionsService,directionsDisplay,originpts,waypts,endpts){
    directionsService.route({
          origin: originpts,
          waypoints:waypts,
          destination: endpts,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
       var map ="";
           map =new google.maps.Map(document.getElementById('map'),{
                  center: {lat: -34.397, lng: 150.644},
                  zoom: 10
                    });
             directionsDisplay.setDirections(response);
             directionsDisplay.setMap(map);
             //remove current direction from directionsText element
             //and replace with new directions
             document.getElementById("directionsText").innerHTML="";
             directionsDisplay.setPanel(document.getElementById("directionsText"));
          } else {
            console.log('Directions request failed due to ' + status);
          }
        }
    );
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
      journeySchedule:state.JourneySchedule
    }
  }
)(GoogleMapPlanner);
