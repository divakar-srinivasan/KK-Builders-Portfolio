const jwt = require('jsonwebtoken');
const { jwtSecret, adminUsername, adminPassword } = require('../config/dotenv');

// Admin Login
const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { adminLogin };
