const express = require('express');
const connect = require('./config/db');
const PORT = 6000;
const expenseRouter = require("./routes/expense.route")

const app = express();

app.use(express.json())

app.use("/expense", expenseRouter)

const start = async () => {
    await connect();

    app.listen(PORT, () => {
        console.log("Listening to " , PORT)
    })
}

module.exports = start