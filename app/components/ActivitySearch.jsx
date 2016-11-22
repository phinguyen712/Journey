var React = require('react');
var {connect} = require('react-redux');
import ActivitySearchBar from 'ActivitySearchBar';
import ActivitySearchResults from 'ActivitySearchResults';
import GoogleMapSearch from 'GoogleMapSearch';

var ActivitySearch = React.createClass({

  showSearchResults:function(nextProp){
    var {yelpSearchResults} = this.props;
    if(yelpSearchResults){
      return(
        <div>
          <div className="addFavoriteHint">
          <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            Click on the <i className='glyphicon glyphicon-heart-empty'></i> to add to favorites
          </div>
        <div className='col-xs-12 col-md-6 col-md-push-6'>
          <GoogleMapSearch/>
        </div>
        <div className="col-xs-12 col-md-6 col-md-pull-6 ">
          <ActivitySearchResults/>
        </div>
        </div>
      )
    }else{
      return(
        <div className="emptySearch">
          <h1><i className="fa fa-map" aria-hidden="true"></i>Where do you want to go?</h1>
        </div>
      )
    }
  },


  render:function(){
    return (
      <div className='container searchContainer'>
        <div className="searchBars">
          <ActivitySearchBar/>
        </div>
        {this.showSearchResults()}
      </div>
    );
  }
});


export default connect(
  (state)=>{
    return{
      yelpSearchResults:state.YelpSearchResults
    }
  }
)(ActivitySearch)
