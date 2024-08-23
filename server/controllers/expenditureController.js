import expenditureModel from "../models/expenditureSchema.js";

const getExpenditure = async (req, res) => {
    try {
        const userId = req.user._id;
        const get_exp = await expenditureModel.find({ userId });
        return res.status(200).json(get_exp);
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return res.status(404).json({ message: 'Failed to retrieve expenditure', error: e.message });
    }
};

const createExpenditure = async (req, res) => {
    const { amount, source, date } = req.body;
    try {
        const userId = req.user._id;
        const create_exp = await expenditureModel.create({ amount, source, date,  userId });
        return res.status(201).json(create_exp);
    } catch (e) {
        console.error(e);  // Log the error for debugging
        return res.status(400).json({ message: 'Failed to create expenditure', error: e.message });
    }
};

export {
    getExpenditure,
    createExpenditure
};
