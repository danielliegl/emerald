const { connectToDatabase } = require("../mongoDB");
const { verify_jwt } = require("../verify_token");

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)


    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_USERS);
    const results = await collection.find({}).toArray();
    var retval = []
    results.forEach(user => 
      retval.push({
        id: user._id,
        username: user.name,
        admin: user.admin,
        project_owner: user.project_owner
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(retval),
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}