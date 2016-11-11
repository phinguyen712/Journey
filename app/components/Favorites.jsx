var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Favorites = React.createClass({
  delete:function(id,deleteRoute){
    var {dispatch,favorites} =this.props

    if(deleteRoute.length>0){
      $.ajax({
          type: "DELETE",
          url: deleteRoute,
          data: {id : id},
          dataType:"json",
         success: function(matchFavorites){
            dispatch(actions.userFavorites(matchFavorites));
         }
       });
     }
  },
  render:function(){
    var {id, name, deleteRoute} = this.props;
    return (
      <div id="favorite" className={id}>
        <div id="addToDo">{name}</div>
        <h5 className="glyphicon deleteFavorites glyphicon-trash" onClick={() => {this.delete(id,deleteRoute) }}></h5>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      favorites:state.UserFavorites
    }
  }
)(Favorites)
