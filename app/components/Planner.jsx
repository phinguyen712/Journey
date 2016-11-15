var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import SchedulePanel from 'SchedulePanel';
import MapsDirectonsPanel from 'MapsDirectionsPanel';
import JourneysPanel from 'JourneysPanel'

var Planner = React.createClass({
  componentWillMount:function(){
    var {dispatch, journeySchedule}=this.props
    $.ajax({
       type: "GET",
       url: "/planner/schedule/show",
       dataType:"json",
       success:function(ResponseData){
        dispatch(actions.loggedInUser(ResponseData.User));
        dispatch(actions.JourneySchedule(ResponseData.schedule));
       }
     });
  },
  render:function(){
    return (
      <div className='container'>
          <div className='col-xs-12 col-md-2'>
            <JourneysPanel/>
          </div>
          <div className='col-xs-12 col-md-5 col-md-push-5'>
            <MapsDirectonsPanel/>
          </div>
          <div className="col-xs-12 col-md-5 col-md-pull-5 schedulePanel">
            <SchedulePanel/>
          </div>
      </div>
    );
  },
})

export default connect(
  (state)=>{
    return{
      journeySchedule:state.journeySchedule
    }
  }
)(Planner)
