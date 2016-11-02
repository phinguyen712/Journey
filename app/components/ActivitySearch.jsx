var React = require('react');
import ActivitySearchBar from 'ActivitySearchBar';
import ActivitySearchResults from 'ActivitySearchResults';

var ActivitySearch = () => {
  return (
    <div className='container'>
      <ActivitySearchBar/>
      <ActivitySearchResults/>
    </div>
  );
}

module.exports = ActivitySearch;
