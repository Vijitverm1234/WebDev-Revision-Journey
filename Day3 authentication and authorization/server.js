const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'vs1p4s3v'; // In production, use environment variable
const MONGODB_URI = 'mongodb+srv://vijitverma78:vijit25656710@cluster0.p6ve0.mongodb.net/auth-system?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const dbconnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB is Connected ✌️');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process on connection failure
    }
};
dbconnect();

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('userTest', userSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Backend token-based auth practice' });
});

// Get all users
app.get('/user', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Logout endpoint (client-side should remove token)
app.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT} 🥹`);
});