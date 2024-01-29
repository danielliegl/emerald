const { connectToDatabase } = require("../mongoDB")
const { Script } = require("../script")
const { verify_jwt } = require("../verify_token")
const { ObjectId } = require("mongodb")

const handler = async (event) => {
  try {

    const decodedUser = verify_jwt(event.headers)

    var requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    requestData.project_data.owner = new ObjectId(decodedUser.user_id)
    await collection.insertOne(requestData.project_data)
    return {
      statusCode: 200,
      body: JSON.stringify(project_data)
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}