const { connectToDatabase } = require("../mongoDB")
const { Script } = require("../script")

const handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    new_script = new Script(requestData.name, requestData.owner)
    collection.insertOne(new_script)
    return {
      statusCode: 200,
      body: JSON.stringify({new_script: new_script})
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}