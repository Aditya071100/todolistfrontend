import axios from 'axios';

import React,{useContext, useState} from 'react'
import noteContext from '../../context copy/notes/noteContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Todolist = ({todo,index}) => {
    const context= useContext(noteContext);
    const{deleteTodo}=context;
    const [status,setstatus]=useState('unComplete');
    const [edit,setedit]=useState(todo.todo)
    function change(){
        setstatus("complete")
    }
   
   
  return (
    <div>
    <table class="table">
 
  <tbody>
    <tr>
      <th scope="row">{index+1}</th>
      <td style={{paddingLeft:50}}>{todo.todo}</td>
      <td> <Popup trigger={<button className='btn btn-warning' style={{marginLeft:100}}> Edit</button>} position="right center">
    <div> <input type= "text"  style={{width:500,paddingTop:10}} value={edit}  onChange={(e) => setedit(e.target.value)} /> <button className='btn btn-success' onClick={()=>axios.put(`/api/v1/updateTodo/${todo._id}`,{edit})}>edit</button></div>
  </Popup></td>
      <td style={{float:"right"}}> <button  className="btn btn-primary" onClick={()=>axios.put(`/api/v1/change/${todo._id}`)}>{todo.status==true?"Complete":"UnComplete"}</button> </td>
      <td style={{paddingRight:650}}><button  className="btn btn-danger" onClick={()=>axios.delete  (`/api/v1/delete/${todo._id}`)}>Delete</button></td>
    </tr>
    
  </tbody>
</table>
  </div>
    
  )
}

export default Todolist