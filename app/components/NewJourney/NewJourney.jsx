var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var {Link, hashHistory} = require('react-router');


var NewJourney = React.createClass({
    submitNewJourney:function(e){
      e.preventDefault();
      var{dispatch}=this.props
      var caption = this.refs.caption.value;
      var journeyName = this.refs.journeyName.value;
      $.ajax({
         type: "POST",
         url: "/journey/create",
         data: {caption:caption,journeyName:journeyName},
         dataType:"json",
         success:function(userJourney){
          if(userJourney){
            console.log(userJourney);
            dispatch(actions.loggedInUser(userJourney));
          }else{
            var tempUser={
                    currentJourney:{
                                  id:Date.now(),
                                  name:journeyName,
                                  caption:caption
                                  }
                          };
            dispatch(actions.loggedInUser(tempUser));
          };
          hashHistory.push("/ActivitySearch");
         }
       });
    },
    render:function(){
      return (
        <div className="container ">
            <form className="form-group newJourneyPanel" onSubmit={this.submitNewJourney} >
            <div>
              <label >Journey Name</label>
              <input type="text" ref="journeyName"
                className="form-control" id="nameInput" name="journeyName" required/>
            </div>
            <div className="form-group">
              <label >Things To Do</label>
              <input className="form-control" ref="caption" placeholder="Not sure?... Dont worry, you can fill this out later"
                id="descriptionInput" name="caption"/>
            </div>
            <button className="btn btn-default" type="submit">Submit</button>
            </form>
        </div>
      );
    }
});


export default connect()(NewJourney)
