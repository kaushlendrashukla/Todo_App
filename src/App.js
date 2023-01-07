import React, { useState, useRef } from 'react'

import './App.css';

function App() {
  const todoref = useRef('')
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(0)

  const submitHandler = (e) => {
    e.preventDefault();
    if(editId){
      const editTodo = todos.find(item => item.id === editId);
      const updatedTodo = todos.map(t => 
        t.id === editTodo.id ? ( t = { id: t.id, todo }) : { id: t.id, todo: t.todo}
      )
      setTodos(updatedTodo)
      setEditId(0)
      setTodo('')
      return
    }
    if (todo !== '') {
      setTodos([{ key: `${todo}-${Date.now()}`, id: `${todo}-${Date.now()}`, todo }, ...todos])
      setTodo('')
    }

  }

  const deleteHandler = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id )
    setTodos([...deleteTodo])
  }

  const editHandler = (id) => { 
    const editTodo = todos.find(item => item.id === id)
    setTodo(editTodo.todo)
    setEditId(id)
  }
  
  return (
    <div className="app">
      <div className="container">
        <h1>TODO LIST</h1>
        <form className="form" onSubmit={submitHandler}>
          <input className="input" placeholder='Add items' type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button className='addbutton' type="submit"> {editId ? "Edit" : 'Add'}</button>
        </form>

        <ul className="todolist">
          {
            todos.map((item )=> (
              <li className="singletodo" key={item.key}>
                <span className="todoname">
                  {item.todo}
                </span>
                <button onClick={() => editHandler(item.id)}>
                 edit
                  </button>
                <button className='delbutton' onClick= {() => deleteHandler (item.id)}>delet</button>
              </li>
            ))
          }
         
        </ul>


      </div>
    </div>

  );
}

export default App;
