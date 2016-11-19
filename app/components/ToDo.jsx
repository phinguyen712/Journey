var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import {SortableElement} from 'react-sortable-hoc';

var ToDo = SortableElement(React.createClass({

    removeToDo:function(toDoObject,user,currentDay,index,dispatch){
      var currentJourney = user.currentJourney.id;
      var deleteToDo = toDoObject.id;

      $.ajax({
          type: "DELETE",
          url:"/planner/toDo/delete",
          data:{id:deleteToDo , day:currentDay , journeyId: currentJourney, index:index},
          success:function(deletedYelpData){
              dispatch(actions.JourneySchedule(deletedYelpData));
          }
     });
   },


   renderDistances:function(distances){
    if(distances){
       return(
            <span className="distance"><i className="fa fa-car"></i>
              &nbsp;<span className="duration">{distances.duration}</span>
              &nbsp;<span className="distances">{distances.distance}</span>
           </span>
       )
     }
   },


  render:function(){
    var {index,toDoObject,currentDay,user,distances,dispatch} =this.props;
    var Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']
    return (
          <div className='ToDoItems'>
             <img className='locationImage'src={toDoObject.image_url}></img>
             <div className='list-group-item'>
                 <h5 className='list-group-item-heading' id='heading'><span className='queryNumber'>{Alphabet[index]}</span>
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
                  {this.renderDistances(distances)}
             </div>
             <div onClick={()=>{this.removeToDo(toDoObject,user,currentDay,index,dispatch)}}
               className='glyphicon glyphicon-remove removeToDo'></div>
           </div>
    )
  }
}));

export default connect(
  (state)=>{
    return{
      currentDay:state.CurrentJourneyDay,
      user:state.User,
    }
  }
)(ToDo);
