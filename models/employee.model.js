const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {type: mongoose.Types.ObjectId, required: true},
    name: {type: String, required: true},
    gender: String
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee