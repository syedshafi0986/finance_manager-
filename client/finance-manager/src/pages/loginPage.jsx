import React, { useState } from 'react';
import { useLogin } from '../hooks/uselogin'; // Custom hook for login logic
import { useNavigate } from 'react-router-dom'; // For navigation after login

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin(); // Access login function and status
  const navigate = useNavigate(); // Initialize navigation hook

  // Handle login process and redirect on success
  async function handleLogin(e) {
    e.preventDefault();

    // Trigger the login process
    const success = await login(name, password);

    // If login is successful, navigate to summary page
    if (success) {
      navigate("/user/transaction/summary");
    }

    // Clear the input fields after the attempt
    setName("");
    setPassword("");
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
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
        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
