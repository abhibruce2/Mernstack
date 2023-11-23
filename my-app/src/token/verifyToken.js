import React from 'react';
import jwt from 'jsonwebtoken';

const GenerateToken = () => {
  
    // Replace with your secret key (keep it secure and don't expose in the frontend)
    const secretKey = 'your_secret_key';

    // Sample payload (user information, etc.)
    const payload = {
      userId: 123,
      username: 'abhibruce2@gmail.com',
      role: 'user',
    };

    // Generate a JWT token
    const token = jwt.sign(payload, secretKey);

    console.log('Generated Token:', token);

};

export default GenerateToken;
