var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import ToDo from "ToDo";

var SchedulePanel = React.createClass({

  ToDo:function(){

  },

  render:function(){
    return (
      <div>
          <ToDo/>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      journeySchedule:state.JourneySchedule
    }
  }
)(SchedulePanel)
