const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../mongoDB");
const { verify_jwt } = require("../verify_token");

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)
    console.log(decodedUser)
    const user_id = new ObjectId(decodedUser.user_id)

    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const results = await collection.find({
    $or: [
      { owner: user_id },
      { assignedUsers: { $in: [user_id] } }
    ]
  }).limit(10).toArray();
    
    var retval = {user_scripts: [], assigned_scripts:[]}
    results.forEach(script => {
      if(script.owner.equals(user_id))
      {
        retval.user_scripts.push({
          id: script._id,
          name: script.name
        })
      }
      else
      {
        retval.assigned_scripts.push({
          id: script._id,
          name: script.name
        })
      }

  });

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