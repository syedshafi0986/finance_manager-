import React from 'react';
import IncomeForm from '../components/incomeform';
import IncomeDetails from '../components/incomeDetails';

const IncomePage = () => {
  return (
    <div>
      <h1>Manage Your Income</h1>
      
      {/* Add Income Form */}
      <div>
        <IncomeForm />
      </div>

      {/* Display Income Details */}
      <div>
        <IncomeDetails />
      </div>
    </div>
  );
}

export default IncomePage;
