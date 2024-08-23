import incomeModel from "../models/incomeSchema.js";
import expenditureModel from "../models/expenditureSchema.js";

const getSummary = async (req, res) => {
    try {
        const userId = req.user._id;

    
        const totalIncome = await incomeModel.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpenditure = await expenditureModel.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Access the results
        const income = totalIncome[0]?.total || 0;
        const expenditure = totalExpenditure[0]?.total || 0;
        const balance = income - expenditure;

        return res.status(200).json({ income, expenditure, balance });
    } catch (e) {
        console.error(e); 
        return res.status(500).json({ message: "Failed to get summary", error: e.message });
    }
};

export { getSummary };
