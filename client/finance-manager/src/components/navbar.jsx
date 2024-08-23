import { Link } from 'react-router-dom'; // For navigation links
import { useLogout } from '../hooks/useLogout'; // Custom hook for logout logic
import { useAuthContext } from '../hooks/useAuthcontext'; // Access user authentication state

const Navbar = () => {
  const { logout } = useLogout(); // Logout function from custom hook
  const { user } = useAuthContext(); // Access current authenticated user

  const handleLogout = () => {
    logout(); // Handle logout when user clicks logout button
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Always visible links */}
        <Link to="/">Home</Link>
        {user && (
          <>
            {/* Links visible only when the user is logged in */}
            <Link to="/user/transaction/income">Income</Link>
            <Link to="/user/transaction/expenditure">Expenditure</Link>
            <Link to="/user/transaction/summary">Summary</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            {/* Links for non-authenticated users */}
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Signup</Link>
          </>
        ) : (
          <div className="user-info">
            {/* User name and logout option when logged in */}
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
