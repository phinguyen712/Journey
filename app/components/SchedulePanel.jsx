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
    console.log("dfd")
    var newSchedule = user._id ? journeySchedule:tempSched;
    console.log(newSchedule);
     if(newSchedule.length > 1){
       console.log("33")
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
     }else if(newSchedule.length === 1){
       console.log("efe")
         return (
           <ToDo index={0}
                 toDoObject={newSchedule[0]}
           />
         );
     }

  },


  render:function(){
    var {distances,journeySchedule,tempJourneySchedule,user} = this.props;
    console.log("test");
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
