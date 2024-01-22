const { connectToDatabase } = require("../mongoDB")
const { ObjectId } = require("mongodb")
const { verify_jwt } = require("../verify_token")

const handler = async (event) => {
  try {

    const decodedUser = verify_jwt(event.headers)
    if(!decodedUser.admin)
    {
      return {
        statusCode: 401
      }
    }

    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_USERS);
    
    const user_id = requestData.id;

    if(!user_id)
    {
        return {
            statusCode: 400,
            body: "Bad Request"
        }
    }
    
    const found_user = await collection.findOne({_id: new ObjectId(user_id)})
    
    if(!found_user)
    {
        return {
            statusCode: 400,
            body: "No user found with given ID."
        }
    }

    const username = found_user.name

    await collection.deleteOne({
        _id: new ObjectId(user_id)
    })

    return {
      statusCode: 200,
      body: "Deleted user " + username + " successfully."
    }
  }
  catch (error)
  {
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}