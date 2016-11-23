var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var DaySelection = React.createClass({

  changeDate:function(day){
    var {user,dispatch} =this.props
    var journeyId= user.currentJourney.id
    $.ajax({
       type: "POST",
       url: "/planner/days",
       data: {day:day-1 , journeyId: journeyId},
       dataType:"json",
       success:function(newSchedule){
         dispatch(actions.JourneySchedule(newSchedule));
         dispatch(actions.CurrentJourneyDay(day));
       }
    })
  },

  render:function(){
    var {currentDay}=this.props
    var nextDay = currentDay+1;
    var previousDay = (currentDay == 1) ? currentDay:currentDay-1;
    return(
        <div className="daySelection">
            <h5><span id="previousDay" onClick={()=>{this.changeDate(previousDay)}}
              className="triangle glyphicon glyphicon-triangle-left">
            </span>  day<span id="currentDay">{currentDay}  </span>
          <span id="nextDay" onClick={()=>{this.changeDate(nextDay)}}
            className="triangle glyphicon glyphicon-triangle-right">
            </span>
          </h5>
         </div>
      )
    }
});

export default connect(
  (state)=>{
    return{
      currentDay:state.CurrentJourneyDay,
      user:state.User
    }
  }
)(DaySelection)
