var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import {SortableContainer} from 'react-sortable-hoc';
import ToDo from "ToDo";
import DaySelection from "DaySelection";


var SchedulePanel = SortableContainer(React.createClass({
  renderToDo:function(distances,journeySchedule,tempJourneySchedule,user){
    var sortable = this.refs.sortable;
    var tempSched=[];

    if(tempJourneySchedule.length){
      tempSched = tempJourneySchedule[0].schedule;

    }
    var newSchedule = user.id ? journeySchedule:tempSched;
     if(newSchedule.length){
         return(
             newSchedule.map(function(toDo,i){
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
                 toDoObject={newSchedule}
                 key={1}
           />
         );
     }

  },


  render:function(){
    var {distances,journeySchedule,tempJourneySchedule,user} = this.props;
    return(
        <div className="schedulePanel">
            <DaySelection/>
            <div className="sortPanel" ref="sortable">
              {this.renderToDo(distances,journeySchedule,tempJourneySchedule,user)}
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
      distances:state.CurrentJourneyDistances,
      tempJourneySchedule:state.TempJourney
    }
  }
)(SchedulePanel);
