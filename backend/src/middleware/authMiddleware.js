const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/dotenv');

// Verify JWT Token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.role !== 'admin') throw new Error();
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyAdmin };
