import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import React, { useEffect, useState } from 'react'
import Todolist from './Todolist';

const Todo = () => {
const [todolist,settodolist]=useState([]);
const [todo,setTodo]=useState('');
const[st,setst]=useState();
const[complete,setcomplete]=useState([])
let index=1;
useEffect(()=>{
  const interval= setInterval(() => {
    axios.get("/api/v1/alltodo").then(res=>{
       
      settodolist(res.data.data)
      console.log(res.data.data);
      
  })
   }, 2000);
})
const change=(event)=>{
    setTodo(event.target.value);
}
const addtodo=()=>{
     axios.post("/api/v1/todo",{todo}).then(res=>console.log(res))
}


  return (
    <div><h1>Todo</h1>
   
    <Popup trigger={<button className='btn btn-primary btn-xs' style={{marginLeft:50,marginRight:50 }}> show complete</button>} position="right center">
    <div> <button onClick={()=>axios.get("/api/v1/completetodo",true).then(res=>setcomplete(res.data.data))}>click</button>
    {
      complete.map((todos)=>(
        <p>{todos.todo}</p>
      ))
    } </div>
  </Popup>
  <Popup trigger={<button className='btn btn-primary'  style={{marginLeft:50,marginRight:50}}> show Uncomplete</button>} position="right center">
    <div> <button onClick={()=>axios.get("/api/v1/incompletetodo",false).then(res=>setcomplete(res.data.data))}>click</button>
    {
      complete.map((todos)=>(
        <p>{todos.todo}</p>
      ))
    } </div>
  </Popup>
    <button className='btn btn-danger '  style={{marginLeft:50,marginRight:50}} onClick={()=>axios.delete("/api/v1/deleteall")} >delete all</button>
     
        <input style={{width:1000,paddingTop:10}}
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        
        <button onClick={()=>axios.post("/api/v1/todo",{todo}).then(res=>setTodo(''))}>Add Todo</button>
      
    {
        todolist.map((todos,index)=>(
            <Todolist key={todos._id} todo={todos} index={index}/>
            
            
        ))
    }
    
    </div>
  )
}

export default Todo