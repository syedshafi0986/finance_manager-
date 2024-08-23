import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import { useAuthContext } from '../hooks/useAuthcontext';

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Automatically navigate to the summary page if the user is logged in
  useEffect(() => {
    if (user) {
      navigate("/summary"); 
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <h1>Financial Manager - Manage All Your Financials Effectively</h1>
      {!user ? (
        <h2>New to this application? No worries! Register yourself at the top, or login if you're already registered.</h2>
      ) : null}
    </div>
  );
}

export default Home;
