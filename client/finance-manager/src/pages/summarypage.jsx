import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Usersummary from "../components/summary"; // Corrected to default import

const Summarypage = () => {
  return (
    <div>
      <div className="navigation-buttons">
        <Link to="/user/transaction/income">
          <button>Income</button>
        </Link>
        <Link to="/user/transaction/expenditure">
          <button>Expenditure</button>
        </Link>
      </div>

      {/* User Summary */}
      <Usersummary />
    </div>
  );
};

export default Summarypage;
