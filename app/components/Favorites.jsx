var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Favorites = React.createClass({

  render:function(){
    var {key,name} = this.props
    return (
      <div id="favorite" refs={key}>
      {name}<span id="deleteFavorites">X</span>
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
)(Favorites)
