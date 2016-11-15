var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import ToDo from "ToDo";
import DaySelection from "DaySelection";

var SchedulePanel = React.createClass({

  todo:function(){
    var {journeySchedule} = this.props;
      if(journeySchedule.length>0){
        return(
          journeySchedule.map(function(toDo, index){
            return(
              <ToDo index={index} key={index} toDoObject={toDo} />
            );
          })
        );
      };
  },

  render:function(){
    return(
        <div>
            <DaySelection/>
            {this.todo()}
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
)(SchedulePanel);
