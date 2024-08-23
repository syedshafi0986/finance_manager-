import { useIncomeContext } from "../hooks/useincomecontext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useState } from "react";
import IncomeDetails from "./incomeDetails";

const IncomeForm = () => {
  const { addIncome } = useIncomeContext();
  const { user } = useAuthContext();

  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const income = { amount, source, date };

    try {
      const response = await fetch("http://localhost:3000/user/transaction/income", {
        method: 'POST',
        body: JSON.stringify(income),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setAmount('');
        setSource('');
        setDate('');
        setError(null);
        addIncome(json);
      }
    } catch (err) {
      setError("An error occurred while adding income");
    }
  };

  return (
    <>
      <form className="income-form" onSubmit={handleSubmit}>
        <h3>Add Income</h3>

        <label>Amount:</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <label>Source:</label>
        <input
          type="text"
          onChange={(e) => setSource(e.target.value)}
          value={source}
        />

        <label>Date:</label>
        <input
          type="text"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          placeholder="YYYY-MM-DD"
        />

        <button>Add Income</button>
        {error && <div className="error">{error}</div>}
      </form>

      {/* Conditionally render IncomeDetails if there's no error */}
      {!error && <IncomeDetails />}
    </>
  );
};

export default IncomeForm;
