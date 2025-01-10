const jwt = require('jsonwebtoken');

// POST /api/v1/logon
const logon = async (req, res) => {
  const { name, password } = req.body;

  // Simple validation
  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof password !== 'string' || password.trim() === ''
  ) {
    return res.status(400).json({ message: 'Name and password must be valid non-empty strings' });
  }

  try {
  // Generate token asynhronously 
  const token = await new Promise((resolve, reject) => {
    jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

  res.status(200).json({ token });
} catch (error) {
  res.status(500).json({ message: 'Error generating token' });
}
};

// GET /api/v1/hello
const hello = (req, res) => {
  const user = req.user; // Retrieved from the authenticate middleware
  res.status(200).json({ message: `Hello, ${user.name}!` });
};

module.exports = { logon, hello };