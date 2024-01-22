const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../mongoDB");
const { verify_jwt } = require("../verify_token");

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)
    const user_id = new ObjectId(decodedUser.user_id)

    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const user_collection = database.collection(process.env.MONGODB_COLLECTION_USERS)
    const results = await collection.find({
    $or: [
      { owner: user_id },
      { assignedUsers: { $in: [user_id] } }
    ]
  }).limit(10).toArray();
    var retval = {user_scripts: [], assigned_scripts:[]}
    for (var script of results)
    {
      if(script.owner.equals(user_id))
      {
        retval.user_scripts.push({
          id: script._id,
          name: script.name
        })
      }
      else
      {
        const owner = await user_collection.findOne({_id: new ObjectId(script.owner)})
        console.log(owner)
        retval.assigned_scripts.push({
          id: script._id,
          name: script.name,
          due_date: script.due_date,
          owner_name: owner.name
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(retval),
    }
  }
  catch (error)
  {
    console.log(error)
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}