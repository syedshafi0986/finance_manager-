import { useExpenditureContext } from "../hooks/useexpenditurecontext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useEffect, useRef } from "react";

const ExpenditureDetails = () => {
  const { Expenditures, displayExpenditure } = useExpenditureContext();
  const { user } = useAuthContext();
  const hasFetched = useRef(false); // Ref to track if data has been fetched

  const fetchExpenditureData = async () => {
    if (hasFetched.current) return; // Prevent duplicate fetches

    try {
      const response = await fetch("http://localhost:3000/user/transaction/expenditure", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        displayExpenditure(json); // Assuming `displayExpenditure` sets the state with the expenditure array
        hasFetched.current = true; // Mark as fetched
      }
    } catch (err) {
      console.error("Failed to fetch expenditure data:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenditureData();
    }
  }, [user]); // Re-fetch data when `user` changes

  return (
    <div className="expenditure-details">
      <h3>Expenditure Details</h3>
      {Expenditures.length > 0 ? (
        <ul>
          {Expenditures.map((expenditure) => (
            <li key={expenditure._id} className="expenditure-item">
              <p>Amount: {expenditure.amount}</p>
              <p>Source: {expenditure.source}</p>
              <p>Date: {new Date(expenditure.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">No expenditure data found.</p>
      )}
    </div>
  );
};

export default ExpenditureDetails;
