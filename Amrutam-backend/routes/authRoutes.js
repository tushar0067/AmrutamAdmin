// amrutam-backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// --- IMPORTANT: This route should only be run ONCE to create your admin ---
// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).send({ message: 'Admin user created successfully!' });
//     } catch (error) {
//         res.status(400).send({ message: 'Error creating admin', error: error.message });
//     }
// });

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Create and sign a JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET, // A secret key for signing tokens
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// POST /api/auth/logout
router.post('/logout', (req, res) => {
    // In a stateless JWT setup, the main logout logic is on the client.
    // The server can simply acknowledge the request.
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;