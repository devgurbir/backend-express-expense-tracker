const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required: true},
    amount: {type: Number, required: true},
    type: {type: String, enumm: ["internet", "travel", "logistics", "food", "others"], required: true},
    date: { type: Date, default: Date.now() },
    employeeId: {type: String, required: true},
    reimbursed: {type: Boolean, required: true},
    reimbursed_date: { type: Date, default: null },
}, {timestamps: true})

const Expense = mongoose.model('Expense', expenseSchema, "expense");

module.exports = Expense

