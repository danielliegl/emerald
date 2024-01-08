const passport = require("passport")
const bcrypt = require("bcrypt");
const { application } = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)

require('dotenv').config();

const LocalStrategy = require("passport-local").Strategy

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await db.collection('Users').findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


application.use(passport.initialize())
application.use(passport.session())

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: process.env.MONGODB_COLLECTION_SESSIONS
})


application.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));