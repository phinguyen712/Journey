var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ToDo = React.createClass({
  render:function(){
    return (
      <div>
      todo
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      journeySchedule:state.journeySchedule
    }
  }
)(ToDo)
