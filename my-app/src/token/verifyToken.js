import React from 'react';
import jwt from 'jsonwebtoken';

const GenerateToken = () => {
  
    const secretKey = 'your_secret_key';

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
