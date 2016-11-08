var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchPlaces = React.createClass({
//add places to userFavorites when heart button is clicked
  handleClick:function(results){
    var {dispatch} = this.props
    $.ajax({
       type: "POST",
       url: "/favorites/save",
       data: results,
       dataType:"json",
       success:function(userAccount){
         dispatch(actions.userFavorites(userAccount.favorites));
       }
     });
  },

  heartIconToggle:function(userFavorites,id){

      if(userFavorites.indexOf(id) == -1){
        return("glyphicon glyphicon-heart-empty");
      }else{
        return("glyphicon glyphicon-heart");
      }
  },

  render:function(){
    var {index, results, UserFavorites}=this.props
    return(
      <div className ='resultboxes'>
        <img className='locationImage'src={results.image_url}></img>
        <span className='list-group-item'>
          <h5 className='list-group-item-heading' id='heading'>
            <span id='queryNumber'>{index}.</span><span><a href={results.url}>{results.name}</a> </span>
            <img src={results.rating_img_url}></img><span id='reviews'>{results.review_count} reviews </span>
          </h5>
          <p className='list-group-item-text'>{results.snippet_text}</p>
          <div id='heartIcon' onClick={()=>this.handleClick(results)} className={this.heartIconToggle(UserFavorites,results.id)}></div>
        </span>
      </div>
    )
  }
});


export default connect(
  (state)=>{
    return{
      UserFavorites:state.UserFavorites
    }
  }
)(ActivitySearchPlaces)
