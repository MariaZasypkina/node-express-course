const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

  try {
    // Verify token asynchronously
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err); // Pass error to the catch block
        }
        resolve(decoded); // Pass decoded payload to the try block
      });
    });

    // Attach user info from token payload to req.user
    req.user = { name: payload.name };
    next(); // Pass control to the next middleware/controller
  } catch (error) {
    // Return unauthorized response if token is invalid or verification fails
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
