import { useExpenditureContext } from "../hooks/useexpenditurecontext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useState } from "react";
import ExpenditureDetails from "./expenditureDetails";

const ExpenditureForm = () => {
  const { addExpenditure } = useExpenditureContext();
  const { user } = useAuthContext();

  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State to track success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Basic validation
    if (!amount || !source || !date) {
      setError("Please fill in all fields");
      return;
    }

    const expenditure = { amount, source, date };

    try {
      const response = await fetch("http://localhost:3000/user/transaction/expenditure", {
        method: 'POST',
        body: JSON.stringify(expenditure),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'An error occurred');
        setSuccess(null); // Clear success message if there's an error
      } else {
        setAmount('');
        setSource('');
        setDate('');
        setError(null);
        setSuccess("Expenditure added successfully!"); // Set success message
        addExpenditure(json);
      }
    } catch (err) {
      setError("An error occurred while adding expenditure");
      setSuccess(null); // Clear success message if there's an error
    }
  };

  return (
    <form className="expenditure-form" onSubmit={handleSubmit}>
      <h3>Add Expenditure</h3>

      <label>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        min="0"
        step="0.01" // Allows for decimal values
      />

      <label>Source:</label>
      <input
        type="text"
        onChange={(e) => setSource(e.target.value)}
        value={source}
      />

      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <button type="submit">Add Expenditure</button>

      {/* Display success message */}
      {success && <div className="success-message">{success}</div>}

      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Optionally display ExpenditureDetails */}
      {!error && success && <ExpenditureDetails />}
    </form>
  );
};

export default ExpenditureForm;
