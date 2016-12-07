var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Favorites = React.createClass({

  delete:function(id,deleteRoute,dispatch){
    var {user} = this.props;
    if(user._id){
      if(deleteRoute.length>0){
        $.ajax({
            type: "DELETE",
            url: deleteRoute,
            data: {id : id},
            dataType:"json",
           success: function(matchFavorites){
              if(matchFavorites._id){
                dispatch(actions.loggedInUser(matchFavorites));
              }else{
                dispatch(actions.userFavorites(matchFavorites));
              }
           }
         });
       }
     };
  },

  add:function(id,name,addRoute,day,dispatch,index){
    //add data based on database.
    //name is day # for adding Favorites
    var {user, favorites,tempJourneySchedule } = this.props;
    if(!user._id){
      dispatch(actions.addTempJourneySchedule(favorites[index],day));
    }else{
      $.ajax({
          type: "POST",
          url: addRoute,
          data: {id:id, name:name.name, day:day, journeyId:user.currentJourney.id},
          dataType:"json",
         success: function(SavedData){
             dispatch(actions.JourneySchedule(SavedData));
         }
       });
     }
 },

  render:function(){
    var {id, name, deleteRoute, addRoute, dispatch, day, index} = this.props;
    return (
      <div id="favorite" className={id}>
        <div id="addToDo" onClick={() => {
            this.add(id,name,addRoute,day,dispatch,index)
          }}>{name}</div>
        <h5 className="glyphicon deleteFavorites glyphicon-trash"
          onClick={() => {
            this.delete(id,deleteRoute,dispatch)
          }}></h5>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      user:state.User,
      favorites:state.UserFavorites,
      tempJourneySchedule:state.TempJourney
    }
  }
)(Favorites)
