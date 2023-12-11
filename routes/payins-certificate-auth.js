// Import necessary modules
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

// Create an Express router
const router = express.Router();

// Function to generate HMAC SHA256 signature
function generateHmacSha256Signature(payload, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(payload);
  return hmac.digest('hex');
}

// SSL certificate options
const sslOptions = {
  key: fs.readFileSync('./misc/YOUR-private-key.pem'),
  cert: fs.readFileSync('./misc/YOUR-server.crt.pem'),
};

// Define a route for handling POST requests
router.post('/', async (req, res) => {
  // API endpoint URL
  const apiURL = 'https://sandbox-cert.dlocal.com/payments';
  
  // Generate a timestamp for the request
  const timestamp = new Date().toISOString();
  
  // Authentication credentials
  const login = 'X';
  const transKey = 'X';
  const secretKey = 'X';
  
  // Replace this with your actual request payload
  const requestPayload = req.body;

  // Convert request payload to JSON string
  const body = JSON.stringify(requestPayload);
  
  // Concatenate data for creating the HMAC signature
  const concatenatedData = `${login}${timestamp}${body}`;
  
  // Convert secret key to bytes
  const keyBytes = Buffer.from(secretKey, 'utf-8');

  // Generate HMAC SHA256 signature
  const hashBytes = generateHmacSha256Signature(concatenatedData, keyBytes);

  // Set headers for the HTTP request
  const headers = {
    'X-Date': timestamp,
    'X-Login': login,
    'X-Trans-Key': transKey,
    Authorization: `V2-HMAC-SHA256, Signature: ${hashBytes}`,
  };

  // Create an HTTPS agent with SSL options
  const agent = new https.Agent({
    key: sslOptions.key,
    cert: sslOptions.cert
  });

  try {
    // Make a POST request to the API with authentication headers
    const response = await axios.post(apiURL, requestPayload, { headers, httpsAgent: agent });
    
    // Log the response details
    console.log(`Response: ${JSON.stringify(response.data)}`);
    console.log(`Header: ${JSON.stringify(response.headers)}`);
    
    // Send a JSON response indicating success
    res.json({ message: 'Payment request successful', response: response.data });
  } catch (error) {
    // Log and handle errors in case the payment request fails
    console.error(`Payment request failed. Headers: ${error.response.headers}`);
    console.error(`Payment request failed. Message: ${error.response.data.message}`);
    res.status(500).json({ error: `Payment request failed. Error: ${error.response.data.message}` });
  }
});

// Export the router for use in other modules
module.exports = router;
