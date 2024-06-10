import React from 'react';
import { Link } from 'react-router-dom';
function ToDoTable(props) {
const { todos,onUpdate, onDelete} = props

return (
   
<div className="container">
   <table className="table table-striped">
      <thead>
         <tr>
         <th scope="col">Company</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">Deadline</th>
            <th scope="col">Delete</th>
         </tr>
      </thead>
      <tbody>
         {
         todos.map(todo => {
         return (
         <tr key={todo._id}>
            <td>{todo.company_name}</td>
            <td>{todo.title}</td>
            <td>{todo.text}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.deadline}</td>
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
export default ToDoTable;