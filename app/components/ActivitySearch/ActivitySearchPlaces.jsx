var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var ActivitySearchPlaces = React.createClass({
//add places to userFavorites when heart button is clicked
  handleClick:function(results,userFavorites){
    var {dispatch, User} = this.props

    this.updateFavoriteState(dispatch,results,userFavorites,User);
    if(User.username){
      $.ajax({
        type: "PUT",
        url: "/favorites/toggle",
        data: results,
        dataType:"json",
        success:function(response){
          console.log(response);
          dispatch(actions.userFavorites(response));
        }
      });
    }
  },
  updateFavoriteState:function(dispatch,results,userFavorites,user){
    if(user.username){
      var deleteIndex=userFavorites.indexOf(results);
      //use slice to prevent state mutation
      var updateUserFavorites= userFavorites.slice();
      if(deleteIndex !== -1){
        updateUserFavorites.splice(deleteIndex,1);
        dispatch(actions.removeTempFavorites(updateUserFavorites));
      }else{
        dispatch(actions.addTempFavorites(results));
      }
    }else{
      dispatch(actions.addTempFavorites(results))
    }
  },
  heartIconToggle:function(userFavorites,id){
    //create empty array if user is not logged in
    //else pull id into array from userFavorites to return a liked status
    var placesId = (!userFavorites)? [] :
                    userFavorites.map(function(favoritesId){
                      return favoritesId.id
                    });

    if(placesId.indexOf(id) == -1){
      return("glyphicon glyphicon-heart-empty");
    }else{
      return("glyphicon glyphicon-heart");
    }
  },

  render:function(){
    var {index, results, UserFavorites}=this.props
    return(
      <div className = 'resultBoxesContainer col-xs-12 col-md-6 col-lg-12'>
        <div className ='resultboxes col-xs-12'>
          <img className='resultLocationImage'src={results.image_url}></img>
          <span className='resultItem'>
            <h5 className='resultItemHeading' id='heading'>
              <span id='queryNumber'>{index}.</span><span><a href={results.url}>{results.name}</a> </span>
              <img src={results.rating_img_url}></img><span id='resultReviews'>{results.review_count} reviews </span>
            </h5>
            <p className='list-group-item-text'>{results.snippet_text}</p>
            <div id='heartIcon' onClick={()=>this.handleClick(results,UserFavorites)} className={this.heartIconToggle(UserFavorites,results.id)}></div>
          </span>
        </div>
      </div>
    )
  }
});


export default connect(
  (state)=>{
    return{
      UserFavorites:state.UserFavorites,
      User:state.User
    }
  }
)(ActivitySearchPlaces)
