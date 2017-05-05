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
          data: {id:id, name:name, day:day, journeyId:user.currentJourney.id},
          dataType:"json",
         success: function(SavedData){
               if(SavedData.User){
                dispatch(actions.loggedInUser(SavedData.User))
              }
              if(SavedData.schedule){
                dispatch(actions.JourneySchedule(SavedData.schedule));
              }else{
                 console.log(SavedData)
                dispatch(actions.JourneySchedule(SavedData));
              }
         }
       });
     }
   },

  showTrash(journeyLength,id,deleteRoute,dispatch){
    if(journeyLength > 1){
      return(
              <h5 className="glyphicon deleteFavorites glyphicon-trash"
                onClick={() => {
                  this.delete(id,deleteRoute,dispatch)
                }}>
              </h5>
            )
    }
  },

  render:function(){
    var {id, journeyLength, name, deleteRoute, addRoute, dispatch, day, index} = this.props;
    return (
      <div id="favorite" className={id}>
        <div id="addToDo" onClick={() => {
            this.add(id,name,addRoute,day,dispatch,index)
          }}>{name}</div>
        {this.showTrash(journeyLength, id, deleteRoute, dispatch)}
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
