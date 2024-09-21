const mongoose = require('mongoose');
const { type } = require('os');
require('../db/config');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String}
    
});


const student = mongoose.model('student', studentSchema);


module.exports = student;