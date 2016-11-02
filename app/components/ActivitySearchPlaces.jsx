var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchPlaces = React.createClass({

  render:function(){
    var {YelpSearchResults, results}=this.props
    return(
      <div className ='resultboxes'>
        <img className='locationImage'src={results.image_url}></img>
        <span className='list-group-item'>
          <h5 className='list-group-item-heading' id='heading'>
            <span id='queryNumber'>queryNumber</span><span>{results.name}</span>
            <img src={results.rating_img_url}></img><span id='reviews'>{results.review_count} reviews </span>
          </h5>
          <p className='list-group-item-text'>{results.snippet_text}</p>
          <div id='heartIcon' className='glyphicon glyphicon-heart-empty'></div>
        </span>
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
)(ActivitySearchPlaces)
