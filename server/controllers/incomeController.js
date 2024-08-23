import incomeModel from "../models/incomeSchema.js";

const getIncome = async (req, res) => {
    try {
        const userId = req.user._id;
        const get_income = await incomeModel.find({ userId });
        return res.status(200).json(get_income);
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return res.status(404).json({ message: 'Failed to retrieve incomes', error: e.message });
    }
};

const createIncome = async (req, res) => {
    const { amount, source, date } = req.body;
    try {
        const userId = req.user._id;
        const create_income = await incomeModel.create({ amount, source, date,  userId });
        return res.status(201).json(create_income);
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return res.status(400).json({ message: 'Failed to create income', error: e.message });
    }
};

export {
    getIncome,
    createIncome
};
