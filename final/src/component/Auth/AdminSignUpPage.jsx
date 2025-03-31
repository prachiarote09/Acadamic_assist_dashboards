import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import {handleSucess , handleError} from "../../Utils"


function AdminSignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    const {name , email , password} = formData;
        if(!name){
            return handleError('name is required ');
        }
        else if(!email){
            return handleError('email is required ');
        }
        else if(!password){
            return handleError('password is required ');
        }
        //Calling API  and server side validation
        try {
            const url = "http://localhost:8080/auth/signup";  
            const response = await fetch(url,{
                method: "POST",                                 //Sends a signup request (POST) to http://localhost:8080/auth/signup.
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)                // Sends user data (SignupInfo) in JSON format.
            });
            const result = await response.json(); 
            console.log('result' , result)              //Receives a response from the backend.
            const {success , message , error} = result;
            if(success){                                        //Checks if signup was successful (success is true).
                handleSucess(message);                          //Shows a success message (handleSuccess(message)).
                setTimeout(()=>{
                    navigate("/admin/login")                          //Waits 1 second and redirects to the login page (navigate('/login')).
                } ,1000)
            }else if(error){                                    //Server side validation
                const details = error?.details[0].message;      //go to console=>error=>details=>on 0th position error msg will appear from server
                handleError(details);                           //Calling toast function and showing error msg
            }else if(!success){
                handleError(message);
            }
            console.log(result)
        } catch (err) {                                            //If an error occurs, calls handleError(err). */
            handleError(err);
        }
    }
    

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[45vh]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? {" "}
          <Link to="/admin/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AdminSignUpPage;