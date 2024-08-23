import React, { useState } from 'react';
import {useRegister} from "../hooks/useSignup"
// import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom'; // For navigation after login


const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {register, error, isLoading} = useRegister()
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();


    const success = await register(name,password)
    if(success){
      navigate("/user/transaction/summary");
    }
    setName("");
    setPassword("");
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
          
        
      </form>
      
    </div>
  );
};

export default Register;
