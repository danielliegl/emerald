const { connectToDatabase } = require("../mongoDB");
const { verify_jwt } = require("../verify_token");
const { ObjectId } = require("mongodb")

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)

    console.log(decodedUser)

    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_USERS);
    const user_data = await collection.findOne({_id: new ObjectId(decodedUser.user_id)})

    var retval = {
      name: user_data.name,
      admin: decodedUser.admin,
      project_owner: decodedUser.project_owner,
      user_id: decodedUser.user_id
    }


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