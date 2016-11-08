var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import Favorites from 'Favorites'

var JourneysPanel = React.createClass({

    UpdateUserFavorites:function(UserFavorites){
        if(UserFavorites !="false"){
          return(
            UserFavorites.map(function(favorite){
              return(
                  <Favorites name={favorite.name} key={favorite.id}/>
              );
            })
          )
        }else{
          return("Add places to your favorites in the search tab")
        }
    },

    render:function(){
    var {UserFavorites} = this.props
      return (
      <div>
        <button className="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Favorites  <span className="caret"></span>
        </button>
        <div className="collapse" id="collapseExample">
          <div className="list-group">
            {this.UpdateUserFavorites(UserFavorites)}
          </div>
        </div>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      UserFavorites:state.UserFavorites
    }
  }
)(JourneysPanel)
