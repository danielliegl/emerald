const { connectToDatabase } = require('../mongoDB');
const bcrypt = require("bcrypt");
const { verify_jwt } = require('../verify_token');
require('dotenv').config();

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)
    if(!decodedUser.admin)
    {
      return {
        statusCode: 401
      }
    }

    const db = await connectToDatabase();
    const users = db.collection(process.env.MONGODB_COLLECTION_USERS); // Assuming a collection named 'users'

    // Parse the incoming request body for credentials
    const { username, password, admin, project_owner } = JSON.parse(event.body);

    // Check if the user exists in the database
    const existing_user = await users.findOne({ name: username });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 rounds of salt

    const newUser = {
      name: username,
      password: hashedPassword,
      admin: admin,
      project_owner: project_owner
    };

    

    if (existing_user) {
      await collection.replaceOne(
        {
          _id: existing_user._id,
          newUser,
        }
      )
    }
    else
    {
      // Insert the user into the database
      await users.insertOne(newUser);
    }


    return { statusCode: 200, body: JSON.stringify({ message: 'Register User successful' }) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
