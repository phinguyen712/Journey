var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ToDo = React.createClass({

  render:function(){
    var {index,toDoObject} =this.props;
    return (
        <div className='ToDo'>
          <div className='ToDoItems'>
          <img className='locationImage'src={toDoObject.image_url}></img>
         <div className='list-group-item'>
             <h5 className='list-group-item-heading' id='heading'><span className='queryNumber'>{index}</span>
               <span className='scheduleName' id={toDoObject.id}>.
                 <a href={toDoObject.url}>
                   {toDoObject.name}
                 </a>
               </span>
               <span id='reviews'>
                 <img src={toDoObject.rating_img_url}></img> {toDoObject.review_count}reviews
              </span>
             </h5>
             <p className='snippet_text'>{toDoObject.snippet_text}</p>
             <div className='glyphicon glyphicon-remove removeToDo'></div>
         </div>
       </div>
       </div>
    )
  }
});

export default connect()(ToDo)
