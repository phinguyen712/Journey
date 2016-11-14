var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Favorites = React.createClass({
  delete:function(id,deleteRoute,dispatch){
    if(deleteRoute.length>0){
      $.ajax({
          type: "DELETE",
          url: deleteRoute,
          data: {id : id},
          dataType:"json",
         success: function(matchFavorites){
            if(matchFavorites._id){
              console.log(matchFavorites);
              dispatch(actions.loggedInUser(matchFavorites));
            }else{
              dispatch(actions.userFavorites(matchFavorites));
            }
         }
       });
     }
  },
  add:function(id,name,addRoute,day,dispatch){
    //add data based on database.
    //name is day # for adding Favorites
    var {user} =this.props;
    $.ajax({
        type: "POST",
        url: addRoute,
        data: {id:id , name:name ,day:day, journeyId:user.currentJourney.id},
        dataType:"json",
       success: function(SavedData){
         console.log(SavedData);
        if(SavedData.User){
           dispatch(actions.loggedInUser(SavedData.User));
         }else{
          dispatch(actions.JourneySchedule(SavedData));
         }
       }
     });
 },

  render:function(){
    var {id, name, deleteRoute, addRoute, dispatch, day} = this.props;
    return (
      <div id="favorite" className={id}>
        <div id="addToDo" onClick={() => {this.add(id,name,addRoute,day,dispatch)}}>{name}</div>
        <h5 className="glyphicon deleteFavorites glyphicon-trash" onClick={() => {this.delete(id,deleteRoute,dispatch) }}></h5>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      user:state.User,
      favorites:state.UserFavorites
    }
  }
)(Favorites)
