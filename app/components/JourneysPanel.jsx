var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import Favorites from 'Favorites';



var JourneysPanel = React.createClass({

    UpdateUserFavorites:function(UserFavorites){
        if(UserFavorites !="false"){
          return(
            UserFavorites.map(function(favorite,index){
              return(
                  <Favorites name={favorite.name} id={favorite.id} day="1" key={favorite.id}
                    deleteRoute="/favorites/delete" addRoute="/planner/toDo/new"/>
              );
            })
          )
        }else{
          return("Add places to your favorites in the search tab")
        }
    },

    UpdateUserJourneys:function(User){
      var journeys = User.journeys;
        return(
            journeys.map(function(journey){
              return(
                  <Favorites name={journey.journeyName} id={journey._id} key={journey._id} deleteRoute="Journey" addRoute="/planner/journey/show"/>
              );
          })
        )
    },
//waits for prop to update to render saved journeys
    JourneyButton:function(User){
      if(User.currentJourney){
        return(
          <div>
            <button className="btn panel-btn btn-primary btn-block" type="button" ref={User.currentJourney.id}
               data-toggle="collapse" data-target="#collapseJourneys" aria-expanded="false" aria-controls="collapseExample">
            {User.currentJourney.name} <span className="caret"></span>
          </button>
            <div className="collapse" id="collapseJourneys">
              <div className="list-group">
                {this.UpdateUserJourneys(User)}
              </div>
            </div>
          </div>
        )
      }else{}
    },

    render:function(){
    var {UserFavorites, User} = this.props;
      return (
      <div>
        {this.JourneyButton(User)}
        <div>
          <button className="btn panel-btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#collapseFavorites" aria-expanded="false" aria-controls="collapseExample">
            Favorites  <span className="caret"></span>
          </button>
          <div className="collapse" id="collapseFavorites">
            <div className="list-group">
              {this.UpdateUserFavorites(UserFavorites)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect(
  (state)=>{
    return{
      UserFavorites:state.UserFavorites,
      User:state.User
    }
  }
)(JourneysPanel)
