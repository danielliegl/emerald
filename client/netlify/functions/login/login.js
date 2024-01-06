const { connectToDatabase } = require('../mongoDB');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

// Passport.js configuration
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const db = await connectToDatabase();
      const users = db.collection(process.env.MONGODB_COLLECTION_USERS);

      // Find user by username
      const user = await users.findOne({ name: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Login function
exports.handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body);
    const username = requestData.username;
    const password = requestData.password;

    // Authenticate using Passport's local strategy
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          reject({ statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) });
        }

        if (!user) {
          resolve({ statusCode: 401, body: JSON.stringify({ message: 'Invalid credentials' }) });
        }

        // If authentication succeeds, handle user session or return success message
        resolve({ statusCode: 200, body: JSON.stringify({ message: 'Login successful' }) });
      })(null, { username, password }); // Passing username and password to Passport
    });
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body' }) };
  }
};