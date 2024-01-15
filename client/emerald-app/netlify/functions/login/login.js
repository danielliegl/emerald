const { connectToDatabase } = require('../mongoDB');
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sign } = require("jsonwebtoken");
const { ObjectId } = require('mongodb');


// Login function
exports.handler = async (event) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection(process.env.MONGODB_COLLECTION_USERS);

    // Parse the incoming request body for credentials
    const { username, password } = JSON.parse(event.body);

    // Check if the user exists in the database
    const existing_user = await users.findOne({ name: username });
    
    if(!existing_user || !(await bcrypt.compare(password, existing_user.password)))
    {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Authentication failed' }),
      };
    }

    const token = sign({user_id: existing_user._id, admin: existing_user.admin}, process.env.SECRET, {expiresIn: '12h'})

    return({
      statusCode: 200,
      body: JSON.stringify({admin: existing_user.admin}),
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Max-Age=3600; Path=/; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    })


  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body' }) };
  }
};