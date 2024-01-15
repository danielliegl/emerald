const { connectToDatabase } = require('../mongoDB');
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sign } = require("jsonwebtoken");
const { ObjectId } = require('mongodb');
const { verify_jwt } = require("../verify_token")

// Login function
exports.handler = async (event) => {
  try {

    verify_jwt(event.headers)

    return({
      statusCode: 200,
      headers: {
        'Set-Cookie': 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'Content-Type': 'application/json',
      },
    })


  } catch (error) {
    console.log(error)
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body' }) };
  }
};