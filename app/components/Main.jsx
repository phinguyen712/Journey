var React = require('react');
var Navbar  = require("Navbar")

var Main = (props) => {
  return (
    <div>
      <Navbar/>
      {props.children}
    </div>
  );
}


module.exports = Main;
