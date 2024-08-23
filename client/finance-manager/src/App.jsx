import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage'; 
import Home from './pages/Home';
import Register from './pages/register';
import Navbar from './components/navbar'; 
import { useAuthContext } from './hooks/useAuthcontext'; 
import IncomePage from './pages/incomepage';
import ExpenditurePage from './pages/expenditurepage';
import Summarypage from './pages/summarypage';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      {/* Navbar is placed here, so it's always visible */}
      <Navbar /> 

      {/* Main Application Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<LoginPage />} /> 
        <Route path="/user/register" element={<Register />} />

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/user/transaction/income" element={<IncomePage />} />
            <Route path="/user/transaction/expenditure" element={<ExpenditurePage />} />
            <Route path="/user/transaction/summary" element={<Summarypage />} />
          </>
        )}

      </Routes>
    </>
  );
}

export default App;
