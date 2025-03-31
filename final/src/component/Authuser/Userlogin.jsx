import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import {handleSucess , handleError} from "../../Utils"


function Userlogin() {
  const [formData, setFormData] = useState({
    email: "",
    grNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    const copyLoginInfo = { ...formData };
    copyLoginInfo[name] = value;
    setFormData(copyLoginInfo);
  };
  console.log('LoginInfo : ',formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, grNumber } = formData;
    
    if(!email){
      return handleError('email is required ');
    }
    else if(!grNumber){
      return handleError('GR number is required ');
    }
    
    //Calling API  and server side validation
    try {
      const url = "http://localhost:8080/user/login";  
      const response = await fetch(url,{
        method: "POST",                                 
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email: email,
          grNumber: grNumber
        })
      });
      
      const result = await response.json();               
      const {success, message, jwtToken, name, error, _id} = result;
      
      if(success){                                        
        handleSucess(message);                          
        
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('user_id', _id);

        setTimeout(()=>{
          navigate('/user-dashboard')                          
        }, 1000)
      }else if(error){                                    
        const details = error?.details[0].message;      
        handleError(details);                           
      }else if(!success){
        handleError(message);
      }
      console.log(result)
    } catch (err) {                                            
      handleError(err);
    }
  }
    

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[45vh]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <input
            type="password"
            name="grNumber"
            placeholder="GR Number"
            value={formData.grNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Login
          </button>

        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Userlogin;