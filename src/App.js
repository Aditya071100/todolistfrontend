
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';


import NoteState from './context copy/notes/NoteState';


import Login from "./component/User/LoginSignUp"

import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Todo from './component/Todo/Todo';
function App() {
  return (
    <Todo/>
  );
}

export default App;
