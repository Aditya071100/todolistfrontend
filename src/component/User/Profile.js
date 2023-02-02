
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import noteContext from "../../context copy/notes/noteContext";
import internal from "stream";
import axios from "axios"

const Profile = ({ history }) => {
  
  const context = useContext(noteContext);
  const [user,setuser]=useState({});
 
  
 useEffect(()=>{
 
  axios.get(`/api/v1/me`)
  .then(res => setuser(res.data.user))
  .catch(err => console.log(err.message));
  console.log( user)


  
 },[])


  return (
  
        <Fragment>
        
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
  )
};

export default Profile;
