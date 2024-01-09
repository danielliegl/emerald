
require('dotenv').config();

// Login function
exports.handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body);
    const username = requestData.username;
    const password = requestData.password;
    
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body' }) };
  }
};