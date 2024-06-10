import React from 'react';
function ReviewTable(props) {
    const { todos,onUpdate, onDelete} = props
    return (
        <div className="App mt-5">
           <table className="table table-striped">
              <thead>
                 <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Text</th>
                    <th scope="col">Rating</th>
                 </tr>
              </thead>
              <tbody>
              {
         todos.map(todo => {
         return (
         <tr key={todo._id}>
            <td>{todo.title}</td>
            <td>{todo.text}</td>
            <td>{todo.rating}</td>
            <td onClick={() => onUpdate(todo._id, todo.title,todo.text,todo.rating)}>
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
               (<img width="35" src={approved} alt='approved' />) 
               :
               (<img width="35" src={rejected} alt="rejected" />)
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
export default ReviewTable;
