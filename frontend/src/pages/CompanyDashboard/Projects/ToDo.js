import React, { useState,useEffect } from 'react';
import { postTodosAPI,getTodosAPI,patchTodosAPI,deleteTodosAPI } from '../../../services/ToDo';
import CreateToDo from './CreateToDo';
import TodoTable from './ToDoTable';
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
  const updateTodo = (id, company_name,title,text,deadline) => {
    patchTodosAPI(id,company_name,title,text,deadline).then(data => {
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