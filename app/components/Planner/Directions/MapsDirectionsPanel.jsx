var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import GoogleMapPlanner from 'GoogleMapPlanner';

var MapsDirectionsPanel = React.createClass({
  render:function(){
    return (
      <div>
        <GoogleMapPlanner/>
        <div className="input-group">
        </div>
      </div>
    );
  }
});

export default connect()(MapsDirectionsPanel)
