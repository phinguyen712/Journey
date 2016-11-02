var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import ActivitySearchPlaces from "ActivitySearchPlaces"

export var ActivitySearchResults = React.createClass({

  render:function(){
    var {YelpSearchResults} = this.props;
    var yelpResults = () => {
      if(YelpSearchResults.businesses){
        return(
          YelpSearchResults.businesses.map(function(results,index){
            return(
              <ActivitySearchPlaces key={results.id} index={index} results={results}/>
            )
          })
        )
      }else{
        return(
          <h1>pending</h1>
        )
      }
    };
    return(
      <div id="searchPanel">
            <br></br>
          <div id="searchResults">
            {yelpResults()}
        </div>
      </div>
    )
  }
});


export default connect(
  (state)=>{
    return{
      YelpSearchResults:state.YelpSearchResults
    }
  }
)(ActivitySearchResults)
