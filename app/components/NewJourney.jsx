var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');

export var NewJourney= () => {
  return (
    <div className="container">
        <form className="form-group" action="/newJourney" method="POST">
        <div>
          <label for="nameInput">Journey Name</label>
          <input type="text" className="form-control" id="nameInput" name="journeyName"/>
        </div>
        <div className="form-group">
          <label for="descriptionInput">Captions</label>
          <input className="form-control" id="descriptionInput" name="caption"/>
        </div>
        <Link to="/ActivitySearch"><button className="btn btn-default" type="submit">Submit</button></Link>
        </form>
    </div>
  );
}


export default connect()(NewJourney)
