const express = require("express");
const { createExpense, reimburseExpense, getExpensesByEmployeeID, getExpensesBetweenDates, getExpensesGrouped, getAverageExpense} = require("../controllers/expense.controller");

const router = express.Router();
// Get expenses between two dates
router.get("/dates", getExpensesBetweenDates)


// Create
router.post("/create", createExpense)

// Reimburse
router.post("/reimburse", reimburseExpense);



router.get("/average", getAverageExpense)

// Get expenses grouped by type

router.get("/groupedByType", getExpensesGrouped)



// // Get Expenses By employee ID
router.get("/:employee_id", getExpensesByEmployeeID)




module.exports = router;

