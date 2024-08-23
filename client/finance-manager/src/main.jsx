import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ExpenditureContextProvider } from './context/ExpenditureContext.jsx';
import { IncomeContextProvider } from './context/IncomeContext.jsx';
import { SummaryContextProvider } from './context/summaryContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider> 
    <SummaryContextProvider>
      <ExpenditureContextProvider>
        <IncomeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IncomeContextProvider>
      </ExpenditureContextProvider>
    </SummaryContextProvider>
  </AuthContextProvider>
);
