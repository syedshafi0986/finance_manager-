import { useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';

export const useIncomeContext = () => {
  const context = useContext(IncomeContext);

  if (!context) {
    throw new Error('useIncomeContext must be used within an IncomeContextProvider');
  }

  return context;
};
