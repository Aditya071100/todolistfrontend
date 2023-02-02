
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';


import NoteState from './context copy/notes/NoteState';


import Login from "./component/User/LoginSignUp"

import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Todo from './component/Todo/Todo';
function App() {
  return (
  <NoteState>
    <Router>
    
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      
   
    
     
      <Route path="/password/forgot" element ={<ForgotPassword/>}/> 
      <Route path="/api/v1/password/reset/:token" element={<ResetPassword/>}/>
      <Route path="/todo" element={<Todo/>}/>
      
    </Routes>
    
  </Router>
  </NoteState>
  );
}

export default App;
