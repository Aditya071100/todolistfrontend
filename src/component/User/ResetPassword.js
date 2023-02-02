import React, { Fragment, useState, useEffect, useContext } from "react";
import "./ResetPassword.css";



import noteContext from "../../context copy/notes/noteContext";
import { useParams } from "react-router-dom";



const ResetPassword = ({ history, match }) => {
 const  {token}=useParams();
 
 const context = useContext(noteContext);
 const {resetPassword}=context;

 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
     resetPassword(token,myForm);
    
  };



  return (
   
        <Fragment>
          
          <div >
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                 
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
  )
};

export default ResetPassword;
