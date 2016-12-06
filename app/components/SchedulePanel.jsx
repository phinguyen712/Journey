var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import {SortableContainer} from 'react-sortable-hoc';
import ToDo from "ToDo";
import DaySelection from "DaySelection";


var SchedulePanel = SortableContainer(React.createClass({
  renderToDo:function(distances,journeySchedule){

    var sortable = this.refs.sortable
    if(journeySchedule){
       if(journeySchedule.length > 1){
           return(
               journeySchedule.map(function(toDo,i){
                 var currentDistances = (i== distances.length)?"":distances[i];
                 return (
                   <ToDo index={i}
                         distances={currentDistances}
                         toDoObject={toDo}
                         key={i} />
                     );
              })
           );
       }else{
           return (
             <ToDo index={1}
                   distances={""}
                   toDoObject={journeySchedule[0]}
                   key={1}
             />
           );
       }
   }
  },


  render:function(){
    var {distances,journeySchedule} = this.props;
    return(
        <div className="schedulePanel">
            <DaySelection/>
            <div className="sortPanel" ref="sortable">
              {this.renderToDo(distances,journeySchedule)}
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
      user:state.User,
      distances:state.CurrentJourneyDistances
    }
  }
)(SchedulePanel);
