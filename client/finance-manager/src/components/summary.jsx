import { useSummarycontext } from "../hooks/usesummarycontext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useEffect, useState } from "react";

const Usersummary = () => {
    const { displaySummary } = useSummarycontext();
    const { user } = useAuthContext();
    const [summary, setSummary] = useState({ income: 0, expenditure: 0, balance: 0 });
    const [error, setError] = useState(null);

    const fetchSummary = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/transaction/summary', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch summary");
            }

            const json = await response.json();
            setSummary(json);
            displaySummary(json); // Store the summary in the context
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchSummary();
        }
    }, [user]);

    return (
        <div className="summary-details">
            <h3>User Financial Summary</h3>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="summary-info">
                    <p><strong>Total Income:</strong> ${summary.income}</p>
                    <p><strong>Total Expenditure:</strong> ${summary.expenditure}</p>
                    <p><strong>Balance:</strong> ${summary.balance}</p>
                </div>
            )}
        </div>
    );
};

export default Usersummary;
