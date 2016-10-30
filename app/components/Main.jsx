var React = require('react');
import Navbar from 'Navbar';

var Main = (props) => {

  return (
    <div>
      <Navbar/>
      {props.children}
    </div>
  );
}


module.exports = Main;
