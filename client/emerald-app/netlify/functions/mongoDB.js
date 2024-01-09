const { MongoClient } = require("mongodb");
require('dotenv').config();

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const mongoClient = new MongoClient(process.env.MONGODB_URI);

  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE);
    cachedDb = db;
    return db;
  } catch (error) {
    throw new Error('Error connecting to the database: ' + error);
  }
};


module.exports = { connectToDatabase };
