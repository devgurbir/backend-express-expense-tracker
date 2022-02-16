const mongoose = require('mongoose');
const Expense = require('../models/expense.model')
// create expense
const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            _id: new mongoose.Types.ObjectId(),
            amount: req.body.amount,
            type: req.body.type,
            date: req.body.date || Date.now(),
            employeeId: req.body.employeeId,
            reimbursed: req.body.reimbursed || false,
            reimbursed_date: req.body.reimbursed_date || null
        })

        if(!expense) return res.status(400).send({status: "failed", msg: "something went wrong"});
        
        res.status(201).send({status: "success", data: expense});
    } catch (err) {
        res.status(500).send({status: "failed", msg: err});
    }
}

// Reimburse expense
const reimburseExpense = async (req, res) => {
    console.log(req.body._id)
    try {
        const expense = await Expense.findOneAndUpdate({
            _id: req.body._id
        }, {
            reimbursed_date: Date.now(),
            reimbursed: true
        }, {new: true})

        if(!expense) return res.status(400).send({status: "failed", msg: "something went wrong"});
        
        res.status(201).send({status: "success", data: expense});
    } catch (err) {
        res.status(500).send({status: "failed", msg: err});
    }
}

// Get By Employee ID

const getExpensesByEmployeeID = async (req, res) => {
    try {
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const expenses = await Expense.find({
            employeeId: req.params.employee_id
        }).skip((page - 1) * per_page).limit(per_page);

        if(!expenses) return res.status(400).send({status: "failed", msg: "something went wrong"});
        res.status(200).send({status: "success", data: expenses});
    } catch (err) {
        res.status(500).send({status: "failed", msg: "something went wrong"});
    }
}

// get expenses between two dates

const getExpensesBetweenDates = async (req, res) => {     
    console.log('hello')
    try {
        const date1 = req.body.date1 || null;
        const date2 = req.body.date2 || null;

        console.log(date1)

        if(!date1 || !date2){
            return res.status(400).send({status: "failed", msg: "Date 1 or Date 2 is missing"});
        }

        const expenses = await Expense.find({
            date: {"$gte": new Date(date1), "$lt": new Date(date2)}
        }).sort({date: -1})

        if(!expenses) return res.status(400).send({status: "failed", msg: "something went wrong"});
        res.status(200).send({status: "date success", data: expenses});
    } catch (err) {
        res.status(500).send({status: "failed", msg: "something went wrong"});
    }
}

const getExpensesGrouped = async (req, res) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $group: { 
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }, 
            {$sort: {total: -1}}
        ])
        if(!expenses) return res.status(400).send({status: "failed", msg: "something went wrong"});
        res.status(200).send({status: "aiyo", data: expenses});
    } catch (err) {
        res.status(500).send({status: "failed", msg: err});
    }
}

const getAverageExpense = async (req, res) => {
    try {
        const avgDatems = await Expense.aggregate([
            { "$group": {
              "_id": null,
              "avg_time": {
                "$avg": {
                  "$subtract": [
                    "$reimbursed_date",
                    "$date"
                  ]
                }
              }
            }}
          ])
        if(!avgDatems) return res.status(400).send({status: "failed", msg: "something went wrong"});
        let avgDate = new Date(avgDatems)
        res.status(200).send({status: "aiyo", avgDatems: avgDatems});
    } catch (err) {
        res.status(500).send({status: "failed", msg: err});
    }
}

module.exports = {createExpense, reimburseExpense, getExpensesByEmployeeID, getExpensesBetweenDates, getExpensesGrouped, getAverageExpense}