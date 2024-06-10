import React from 'react';
import check from './images/check.png';
import uncheck from './images/uncheck.jpeg';
import approved from './images/download.jpg';
import rejected from './images/no.jpg'
function TodoTable(props) {
const { todos,onUpdate, onDelete} = props;
return (
<div className="container">
   <table className="table table-striped">
      <thead>
         <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Company</th>
            <th scope="col">Deadline</th>
            <th scope="col">Done</th>
            <th scope="col">Approved</th>
            <th scope="col">Delete</th>
         </tr>
      </thead>
      <tbody>
         {
         todos.map(todo => {
         return (
         <tr key={todo._id}>
            <td>{todo.projectName}</td>
            <td>{todo.company}</td>
            <td>{todo.deadline}</td>
            <td onClick={() => onUpdate(todo._id, todo.done,todo.approve)}>
               {
               (todo.done) ? 
               (<img width="25" src={check} alt='check' />) 
               
               :
               (<img width="25" src={uncheck} alt="uncheck"/>)
               }
            </td>
            <td onClick={() => onUpdate(todo._id,todo.approve,todo.done)}>
               {
               (todo.approve) ? 
               (<img width="25"  src={approved} alt='approved' />) 
               :
               (<img width="30" src={rejected} alt="rejected" />)
               }
            </td>
            <td>
               <button className='btn btn-danger' onClick={() => onDelete(todo._id)}>Delete</button>
            </td>
         </tr>
         )
         })
         }
      </tbody>
     
   </table>
</div>
)
}
export default TodoTable;