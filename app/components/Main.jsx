var React = require('react');
var {connect} = require('react-redux');
import Navbar from 'Navbar';

var Main = React.createClass({
  showNavBar:function(){
    var {User} = this.props
    if(User){
      return(
        <Navbar/>
      )
    };
  },
  render:function(){
    return (
        <div className="main">
          {this.showNavBar()}
          {this.props.children}
        </div>
      );
    }
});



export default connect(
  (state)=>{
    return{
      User:state.User,
    }
  }
)(Main)
