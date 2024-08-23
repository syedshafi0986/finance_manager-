import { useContext } from 'react';
import { ExpenditureContext } from '../context/ExpenditureContext';

export const useExpenditureContext = () => {
  const context = useContext(ExpenditureContext);

  if (!context) {
    throw new Error('useExpenditureContext must be used within an ExpenditureContextProvider');
  }

  return context;
};
