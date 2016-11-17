var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import {SortableContainer} from 'react-sortable-hoc';
import ToDo from "ToDo";
import DaySelection from "DaySelection";


var SchedulePanel = SortableContainer(React.createClass({

  todo:function(journeySchedule){
      if(journeySchedule.length>0){
        return(
          journeySchedule.map(function(toDo, i){
            return(
              <ToDo index={i} toDoObject={toDo} key={i}/>
            );
          },this)
        );
      };
  },

  render:function(){
    var {journeySchedule} = this.props;
    return(
        <div>
            <DaySelection/>
            <div className="sortPanel" ref="sortable">
              {this.todo(journeySchedule)}
            </div>
        </div>
      );
    }
  }));

export default connect(
  (state)=>{
    return{
      journeySchedule:state.JourneySchedule,
      currentDay:state.CurrentJourneyDay,
      user:state.User
    }
  }
)(SchedulePanel);
