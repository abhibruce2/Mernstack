const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();

// Sample user data (this could be fetched from a database)

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };
  
  const secretKey = generateSecretKey();
  console.log('Generated Secret Key:', secretKey);
// Secret key for JWT signing
const JWT_SECRET = secretKey;


const postSchema = new mongoose.Schema({
    name : String, 
    email: String, 
    phone : String, 
    dob: String, 
    password : String,
    image: String
  });



  const Users = mongoose.model('users', postSchema);

// Middleware function for authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Login endpoint - generates JWT upon successful login
app.post('/Signin', (req, res) => {
    const { email, password } = req.body;
    const user = Users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET);
    res.json({ accessToken });
});

// Example endpoint requiring authentication
app.get('/resource', authenticateToken, (req, res) => {
    // Accessible only with a valid token
    // Additional logic to retrieve sensitive user data
    res.json({ message: 'This is a protected resource' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
