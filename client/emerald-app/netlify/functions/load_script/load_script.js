const { connectToDatabase } = require("../mongoDB")
const { ObjectId }  = require("mongodb")
const { verify_jwt } = require("../verify_token")

const handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const script_id = requestData.id;
    const decodedUserID = verify_jwt(event.headers)

    if(!script_id)
    {
      return {
        statusCode: 400,
        body: "Bad Syntax"
      }
    }

    const results = await collection.findOne({_id: new ObjectId(script_id)});
    
    if(!results)
    {
      return {
        statusCode: 404,
        body: "No Script with ID " + script_id + " found."
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}