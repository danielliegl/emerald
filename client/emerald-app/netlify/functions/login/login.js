const { connectToDatabase } = require('../mongoDB');
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sign } = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

async function init_admin(collection)
{
  const users = await collection.find({}).toArray();
  if(users.length === 0)
  {
    const hashedPassword = await bcrypt.hash("admin", 10); // Use 10 rounds of salt
    const newUser = {
      name: "admin",
      password: hashedPassword,
      admin: true,
      project_owner: true
    };

    await collection.insertOne(newUser)
    console.log("Admin user Created!")
  }
}

// Login function
exports.handler = async (event) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection(process.env.MONGODB_COLLECTION_USERS);

    // Parse the incoming request body for credentials
    const { username, password } = JSON.parse(event.body);

    // Check if the user exists in the database
    var existing_user = await users.findOne({ name: username });

    if(!(existing_user) && username === "admin" && password === "admin")
    {
      await init_admin(users)
      existing_user = await users.findOne({ name: username})
    }

    console.log(existing_user)

    
    if(!existing_user || !(await bcrypt.compare(password, existing_user.password)))
    {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Authentication failed' }),
      };
    }

    const token = sign({user_id: existing_user._id, admin: existing_user.admin, project_owner: existing_user.project_owner}, process.env.SECRET, {expiresIn: '12h'})

    return({
      statusCode: 200,
      body: JSON.stringify({admin: existing_user.admin, project_owner: existing_user.project_owner}),
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Max-Age=3600; Path=/; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    })


  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body' }) };
  }
};