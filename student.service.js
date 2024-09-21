const Student = require('../models/student.model');

async function findByEmail(email) {
    return await Student.findOne({ email });
}

async function saveAll(userData) {
    const newUser = new Student(userData);
    return await newUser.save();
}

async function findUserDataById(userId) {
    return await Student.findById(userId);
}

async function searchByName(name) {
    // Using a regular expression to search in a case-insensitive manner
    return await Student.find({ name: { $regex: name, $options: 'i' } });
}



module.exports = { findByEmail, saveAll, findUserDataById, searchByName };
