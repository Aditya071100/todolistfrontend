import NoteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';




const NoteState = (props) => {
  const host = "http://localhost:3000"

  const [userlog,setUserlog]=useState(false);

  const [products, setProducts] = useState([]);
  const {product,setProduct}=useState();
  const [user,setUserdata]=useState({})
  const [data,setData]=useState({})
const loadUser=()=>{
 axios.get(`/api/v1/me`)
        .then(res => setData(res.data.user))
        .catch(err => console.log(err.message));
        console.log( data)
        setUserdata(data);
       
}
  const ForgotPassword=async(email)=>{
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${host}/api/v1/forgetPassword`, {email}, config);
    console.log(data.message);
  }

  const getProducts=async(keyword ="", currentPage = 1, price = [0, 25000], category, ratings = 0)=>{

  
    try {
      
      
        await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)
        .then(res => setProducts(res.data.products))
        .catch(err => console.log(err));
        console.log(products)
       
    } catch (err) {
      console.log(err.message);
    }
  
  }

  const ProductDetails=async(id)=>{

           await axios.get(`/api/v1/product/${id}`).then(res=>setProduct(res.data));
           console.log(product);
  }
  

  const register=async(userData)=>{
    
  try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/api/v1/register`, userData, config);
      console.log(data);
  } catch (err) {
    console.log(err.message);
  }
  }
  const login =async(email,password)=>{
    
      try {
        const config = { headers: { "Content-Type": "application/json" } };
   
        const { data } = await axios.post(
          `/api/v1/login`,
          { email, password },
         config
        ).then(setUserlog(true))
        console.log(data);
        setUserdata(data.user);
        console.log(user)
       if(data.success==true){

       }
    
      } catch (err) {
        console.log(err.message);
      }
  }
  const logout=async()=>{
    await axios.get("http://localhost:3000/api/v1/logout").then(setUserlog(false));
    console.log(userlog);
  }
const resetPassword=async(token,passwords)=>{
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const { data } = await axios.put(
    `${host}/api/v1/password/reset/${token}`,
    passwords,
    config
  );
console.log("reset done")
  

}
const deleteTodo=async(id)=>{
  await axios.delete(`/api/v1/delete/${id}`)
}

  return (
    <NoteContext.Provider value={{ deleteTodo,resetPassword,ForgotPassword,products,getProducts,ProductDetails,register,login,logout,user,userlog,loadUser,data }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;