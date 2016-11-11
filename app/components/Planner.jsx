var React = require('react');
import SchedulePanel from 'SchedulePanel';
import MapsDirectonsPanel from 'MapsDirectionsPanel';
import JourneysPanel from 'JourneysPanel'

var Planner = () => {

  return (
    <div className='container'>
        <div className='col-xs-12 col-md-2'>
          <JourneysPanel/>
        </div>
        <div className='col-xs-12 col-md-5 col-md-push-5'>
          <SchedulePanel/>
        </div>
        <div className="col-xs-12 col-md-5 col-md-pull-5">
          <MapsDirectonsPanel/>
        </div>
    </div>
  );
}

module.exports = Planner;
