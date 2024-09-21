const express = require('express');
const router = express.Router();
const studentService = require('../services/student.service');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth.middleware');
const JWT_SECRET = 'rahul7504';  // Store this securely in production

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password, ...otherFields } = req.body;

        const existingUser = await studentService.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, ...otherFields };

        const result = await studentService.saveAll(newUser);
        const token = jwt.sign({ id: result._id, email: result.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await studentService.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to fetch user data
router.get('/user-data', authenticateToken, async (req, res) => {
    try {
        const userData = await studentService.findUserDataById(req.user.id);
        if (!userData) return res.status(404).json({ message: 'User data not found' });
        res.status(200).json({ data: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});



module.exports = router;
