const { connectToDatabase } = require("../mongoDB")
const { ObjectId } = require("mongodb")

const handler = async (event) => {
  try {
    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);

    const script_id = requestData.id;

    if(!script_id)
    {
      return {
        statusCode: 400,
        body: "Bad Request"
      }
    }

    const found_script = await collection.findOne({_id: script_id})

    if(!found_script)
    {
      return {
        statusCode: 400,
        body: "No script found with given ID."
      }
    }

    await collection.deleteOne({
      _id: new ObjectId(script_id)
    })

    return {
      statusCode: 200,
      body: "Deleted script " + script_id + " successfully."
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}
