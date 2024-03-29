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
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const results = await collection.find({}).limit(10).toArray();
    var retval = []
    results.forEach(script => 
      retval.push({
        _id: script._id,
        name: script.name
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