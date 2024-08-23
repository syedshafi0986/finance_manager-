import { useIncomeContext } from "../hooks/useincomecontext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useEffect, useRef } from "react";

const IncomeDetails = () => {
  const { incomes, displayIncome } = useIncomeContext();
  const { user } = useAuthContext();
  const hasFetched = useRef(false); // Ref to track if data has been fetched

  const fetchIncomeData = async () => {
    if (hasFetched.current) return; // Prevent duplicate fetches

    try {
      const response = await fetch("http://localhost:3000/user/transaction/income", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        displayIncome(json); // Assuming `displayIncome` sets the state with the income array
        hasFetched.current = true; // Mark as fetched
      }
    } catch (err) {
      console.error("Failed to fetch income data:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchIncomeData();
      console.log('IncomeDetails rendered');
    }
  }, [user]); // Re-fetch data when `user` changes

  return (
    <div className="income-details">
      <h3>Income Details</h3>
      {incomes.length > 0 ? (
        <ul>
          {incomes.map((income) => (
            <li key={income._id}>
              <p>Amount: {income.amount}</p>
              <p>Source: {income.source}</p>
              <p>Date: {new Date(income.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No income data found.</p>
      )}
    </div>
  );
};

export default IncomeDetails;
