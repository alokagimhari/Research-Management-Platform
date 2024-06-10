import React, { useState,useEffect } from 'react';
import { postTodosAPI,getTodosAPI,patchTodosAPI,deleteTodosAPI } from '../../../services/Todos'
import CreateToDo from './CreateToDo';
import TodoTable from './TodoTable';
function ToDo() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodosAPI().then(todos => setTodos(todos))
  }, []);
  const addTodo = (todo) => {
    postTodosAPI(todo).then(data => {
        console.log("data saved:" + JSON.stringify(data))
      setTodos([...todos, data])
    })
  }
  const updateTodo = (id, done,approve) => {
    patchTodosAPI(id, (done) ? false : true,(approve)?true:false).then(data => {
      if(data){
        console.log('updating records!!')
        getTodosAPI().then(todos => setTodos(todos))
      }
    })
  }
  const deleteTodo = (id) => {
    deleteTodosAPI(id).then(data => {
      if (data.deletedCount === 1) {
        setTodos(todos.filter(todo => todo._id !== id))
      }
    })
  }
    return (
      <main role="main" className="container">
        <CreateToDo onCreate={addTodo} />
        <TodoTable
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          
          />
         
      </main>  
    )
}
export default ToDo;