import { useState } from 'react';
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";

const API_URL = import.meta.env.VITE_API_URL

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showCreateAccount, setShowCreateAccount] = useState(false);

  const navigate = useNavigate();
  const {handleHeaders} = useData();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const loginCredentials = {
        user : {
          email,
          password
        }
      }

      const response = await axios.post(`${API_URL}/users/login`, loginCredentials);
      const {data, headers} = response;
      if (data.data && headers){
        handleHeaders(headers);
        onLogin(true);
        navigate('/');
        console.log(headers);
      }
    }
    catch (error) {
      if (error){
        console.log(error)
      }
    }
  };

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <h2>Log In Here</h2>
      </div>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email</label>
          <input type='text' onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='text' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}

export default Login;