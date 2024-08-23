import React from 'react';
import ExpenditureForm from '../components/expenditureform';
import ExpenditureDetails from '../components/expenditureDetails';

const ExpenditurePage = () => {
  return (
    <div>
      <h1>Manage Your Expenditure</h1>
      
      {/* Add Expenditure Form */}
      <div>
        <ExpenditureForm />
      </div>

      {/* Display Expenditure Details */}
      <div>
        <ExpenditureDetails />
      </div>
    </div>
  );
}

export default ExpenditurePage;
