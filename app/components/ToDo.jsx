var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import {SortableElement} from 'react-sortable-hoc';

var ToDo = SortableElement(React.createClass({
    removeToDo:function(toDoObject,user,currentDay,dispatch){
      var currentJourney = user.currentJourney.id;
      var deleteToDo = toDoObject.id;
      $.ajax({
          type: "DELETE",
          url:"/planner/toDo/delete",
          data:{id:deleteToDo , day:currentDay , journeyId: currentJourney},
          success:function(deletedYelpData){
              dispatch(actions.JourneySchedule(deletedYelpData));
          }
     });
   },

    render:function(){
      var {key,toDoObject,currentDay,user,dispatch} =this.props;
      return (
          <div className='ToDo' value={toDoObject.id}>
            <div className='ToDoItems'>
            <img className='locationImage'src={toDoObject.image_url}></img>
           <div className='list-group-item'>
               <h5 className='list-group-item-heading' id='heading'><span className='queryNumber'>{key}</span>
                 <span className='scheduleName'>.
                   <a href={toDoObject.url}>
                     {toDoObject.name}
                   </a>
                 </span>
                 <span id='reviews'>
                   <img src={toDoObject.rating_img_url}></img> {toDoObject.review_count}reviews
                </span>
               </h5>
               <p className='snippet_text'>{toDoObject.snippet_text}</p>
               <div onClick={()=>{this.removeToDo(toDoObject,user,currentDay,dispatch)}}
                 className='glyphicon glyphicon-remove removeToDo'></div>
           </div>
         </div>
         </div>
      )
    }
  }));

export default connect(
  (state)=>{
    return{
      currentDay:state.CurrentJourneyDay,
      user:state.User
    }
  }
)(ToDo);
