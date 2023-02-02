import React, { useState ,Fragment, useContext} from 'react'
import noteContext from '../../context copy/notes/noteContext';

const ForgotPassword = () => {

  const context = useContext(noteContext);
  const {ForgotPassword}=context;
  const[email,setEmail]=useState("");
  const forgotPasswordSubmit=()=>{
    console.log(email);
    ForgotPassword(email);
  }


  return (
    <Fragment>
 
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordBox">
        <h2 className="forgotPasswordHeading">Forgot Password</h2>

        <form
          className="forgotPasswordForm"
          onSubmit={forgotPasswordSubmit}
        >
          <div className="forgotPasswordEmail">
           
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         <button  onClick={forgotPasswordSubmit}>submit</button>
        </form>
      </div>
      <button onClick={forgotPasswordSubmit}>submit</button>
    </div>
  </Fragment>
  )
}

export default ForgotPassword