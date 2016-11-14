var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link, browserHistory} = require('react-router');


var NewJourney = React.createClass({
    submitNewJourney:function(e){
      var{dispatch}=this.props
      e.preventDefault();
      var caption = this.refs.caption.value;
      var journeyName = this.refs.journeyName.value;

      $.ajax({
         type: "POST",
         url: "/newJourney",
         data: {caption:caption,journeyName:journeyName},
         dataType:"json",
         success:function(userJourney){
            dispatch(actions.loggedInUser(userJourney));
          alert("New Journey Created")

         }
       });

    },
    render:function(){
      return (
        <div className="container">
            <form className="form-group" onSubmit={this.submitNewJourney} >
            <div>
              <label for="nameInput">Journey Name</label>
              <input type="text" ref="journeyName" className="form-control" id="nameInput" name="journeyName"/>
            </div>
            <div className="form-group">
              <label for="descriptionInput">Captions</label>
              <input className="form-control" ref="caption" id="descriptionInput" name="caption"/>
            </div>
            <button className="btn btn-default" type="submit">Submit</button>
            </form>
        </div>
      );
    }
});


export default connect()(NewJourney)
