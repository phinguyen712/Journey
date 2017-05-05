var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import SchedulePanel from 'SchedulePanel';
import MapsDirectonsPanel from 'MapsDirectionsPanel';
import JourneysPanel from 'JourneysPanel';
import {arrayMove} from 'react-sortable-hoc';
var {hashHistory} = require('react-router');


var Planner = React.createClass({
  componentWillMount:function(){
  },

  handleSort:function({oldIndex,newIndex}){
    var {journeySchedule,currentDay,user,dispatch,tempJourneySchedule} = this.props,
        journeyId = user.currentJourney.id;

    //updated db with sorted
    if(user._id){
      var scheduleId = journeySchedule.map(function(schedule){
                      return(schedule.id);
                    }),
          reOrderedSchedule = arrayMove(scheduleId, oldIndex, newIndex)
      $.ajax({
          type:"PUT",
          url:"/planner/schedule/edit",
          data:{id:reOrderedSchedule, day:currentDay , journeyId:journeyId},
          success:function(sortedSchedule){
            console.log(sortedSchedule)
              dispatch(actions.JourneySchedule(sortedSchedule));
          }
      });
    }else{
        var newTempSched = arrayMove(
          tempJourneySchedule[currentDay-1].schedule,
          oldIndex,
          newIndex
        );
        dispatch(actions.TempJourneySchedule(newTempSched,currentDay));
    }
  },

  render:function(){
    return (
      <div className='container'>
          <div className='col-s-12 col-md-2'>
            <JourneysPanel/>
          </div>
          <div className='col-s-12 col-md-5 col-md-push-5'>
            <MapsDirectonsPanel/>
          </div>
          <div className="col-s-12 col-md-5 col-md-pull-5 schedulePanel">
            <SchedulePanel lockAxis="y" distance={5} lockToContainerEdges={true} onSortEnd={this.handleSort} />
          </div>
      </div>
    );
  },
})

export default connect(
  (state)=>{
    return{
      journeySchedule:state.JourneySchedule,
      currentDay:state.CurrentJourneyDay,
      user:state.User,
      userFavorites:state.UserFavorites,
      tempJourneySchedule:state.TempJourney
    }
  }
)(Planner)
