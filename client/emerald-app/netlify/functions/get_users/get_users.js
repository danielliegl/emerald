const { connectToDatabase } = require("../mongoDB");
const { verify_jwt } = require("../verify_token");

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)


    if(!decodedUser.admin)
    {
      return{
        statusCode: 401
      }
    }


    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_USERS);
    const results = await collection.find({}).toArray();
    var retval = []
    results.forEach(user => 
      retval.push({
        _id: user._id,
        name: user.name
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