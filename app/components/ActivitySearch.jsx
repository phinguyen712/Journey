var React = require('react');
import ActivitySearchBar from 'ActivitySearchBar';
import ActivitySearchResults from 'ActivitySearchResults';
import GoogleMap from 'GoogleMap'

var ActivitySearch = () => {
  return (
    <div className='container row'>
      <ActivitySearchBar/>
        <div className='col-xs-12 col-md-6 col-md-push-6'>
        <GoogleMap/>
        </div>
      <div className="col-xs-12 col-md-6 col-md-pull-6 ">
        <ActivitySearchResults/>
      </div>
    </div>
  );
}

module.exports = ActivitySearch;
