const { connectToDatabase } = require("../mongoDB")
const { Script } = require("../script")
const { ObjectId } = require("mongodb")
const { verify_jwt } = require("../verify_token")

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)

    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const new_script_data = requestData.script;
    const script_id = requestData.id;

    if(!script_id || !new_script_data)
    {
      return {
        statusCode: 400
      }
    }

    const found_script = await collection.findOne({ _id: new ObjectId(script_id)})
    if(!found_script)
    {
      return {
        statusCode: 400,
        body: "No script with ID: " + script_id
      }
    }

    if(!(found_script.owner === decodedUser.user_id))
    {
      return{
        statusCode: 401
      }
    }

    await collection.replaceOne(
      {
        _id: new ObjectId(script_id)
      },
      new_script_data)
    
    
    
    return {
      statusCode: 200,
      body: JSON.stringify({new_script_data: new_script_data})
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}