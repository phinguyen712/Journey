var React = require('react');
var {connect} = require('react-redux');
import Navbar from 'Navbar';

var Main = React.createClass({
  render:function(){
    return (
        <div className="main">
          <Navbar/>
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
  },{pure:false}
)(Main)
