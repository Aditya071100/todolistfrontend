import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useEffect, useState } from 'react';
import Todolist from './Todolist';

const Todo = () => {
  const [todolist, setTodolist] = useState([]);
  const [todo, setTodo] = useState('');
  const [complete, setComplete] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/alltodo');
      setTodolist(res.data.data);
      console.log('Fetched Todos:', res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/v1/todo', { todo });
      console.log('Todo Added:', data);
      setTodo(''); // Clear input after adding todo
      fetchTodos(); // Fetch the updated list after adding
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const handleCompleteFetch = async (url) => {
    try {
      const res = await axios.get(`http://localhost:4000${url}`);
      setComplete(res.data.data);
      console.log(`Fetched ${url.includes('complete') ? 'Complete' : 'Incomplete'} Todos:`, res.data);
    } catch (err) {
      console.error('Error fetching complete/incomplete todos:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/todo/${id}`);
      console.log('Todo Deleted:', res.data);
      fetchTodos(); // Fetch the updated list after deletion
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const editTodo = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/todo/${id}`, { todo: editTodoText });
      console.log('Todo Updated:', res.data);
      setEditTodoId(null); // Reset the edit mode
      setEditTodoText(''); // Clear edit input
      fetchTodos(); // Fetch the updated list after editing
    } catch (err) {
      console.error('Error editing todo:', err);
    }
  };

  const startEditing = (id, currentText) => {
    setEditTodoId(id);
    setEditTodoText(currentText);
  };

  const cancelEditing = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const deleteAllTodos = async () => {
    try {
      const res = await axios.delete('http://localhost:4000/api/v1/deleteall');
      console.log('All Todos Deleted:', res.data);
      fetchTodos(); // Fetch the updated list after deletion
    } catch (err) {
      console.error('Error deleting all todos:', err);
    }
  };

  return (
    <div>
      <h1>Todo</h1>

      <Popup
        trigger={
          <button className="btn btn-primary btn-xs" style={{ marginLeft: 50, marginRight: 50 }}>
            Show Complete
          </button>
        }
        position="right center"
      >
        <div>
          <button onClick={() => handleCompleteFetch('/api/v1/completetodo')}>
            Click
          </button>
          {complete?.map((todos) => (
            <p key={todos._id}>{todos.todo}</p>
          ))}
        </div>
      </Popup>

      <Popup
        trigger={
          <button className="btn btn-primary" style={{ marginLeft: 50, marginRight: 50 }}>
            Show Uncomplete
          </button>
        }
        position="right center"
      >
        <div>
          <button onClick={() => handleCompleteFetch('/api/v1/incompletetodo')}>
            Click
          </button>
          {complete?.map((todos) => (
            <p key={todos._id}>{todos.todo}</p>
          ))}
        </div>
      </Popup>

      <button
        className="btn btn-danger"
        style={{ marginLeft: 50, marginRight: 50 }}
        onClick={deleteAllTodos}
      >
        Delete All
      </button>

      <input
        style={{ width: 1000, paddingTop: 10 }}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      {todolist?.map((todos) => (
        <div key={todos._id} style={{ marginTop: 20 }}>
          {editTodoId === todos._id ? (
            <div>
              <input
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
              />
              <button onClick={() => editTodo(todos._id)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            <div style={{justifyContent:"space-between",flex:1,width:"50%",margin:10,display:"flex"}}>
              <span>{todos.todo}</span>
              <button onClick={() => startEditing(todos._id, todos.todo)}>Edit</button>
              <button onClick={() => deleteTodo(todos._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
