var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var MapsDirectionsPanel = React.createClass({
  render:function(){
    return (
      <div>
        Maps
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1"></span>
          <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"/>
        </div>
      </div>
    );
  }
});

export default connect()(MapsDirectionsPanel)
