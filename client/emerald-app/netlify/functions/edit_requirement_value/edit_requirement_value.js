const { connectToDatabase } = require("../mongoDB")
const { ObjectId } = require("mongodb")
const { verify_jwt } = require("../verify_token")

const handler = async (event) => {
  try {
    const decodedUser = verify_jwt(event.headers)
    const user_id = new ObjectId(decodedUser.user_id)
    const requestData = JSON.parse(event.body)
    const database = await connectToDatabase()
    const collection = database.collection(process.env.MONGODB_COLLECTION_SCRIPTS);
    const documentId = new ObjectId(requestData.id);
    const requirement = requestData.requirement;

    if(!documentId)
    {
      return {
        statusCode: 400
      }
    }


    const found_script = await collection.findOne({
      $and: [
        { _id: new ObjectId(documentId) },
        { assignedUsers: user_id },
        { requirements: { $elemMatch: { name: requirement.name } } },
      ],
    });

    if(!found_script)
    {
      return {
        statusCode: 400
      }
    }

    const find_value = await collection.findOne({
      $and: [
        {_id: new ObjectId(documentId)},
        {assignedUsers: user_id},
        { requirements:
          {
            $elemMatch:
            {
              name: requirement.name,
              values: {
                $elemMatch:
                {
                  user_id: user_id
                }
              }
            }
          }
        },
      ]
    })

    const requirementName = requirement.name;
    const requirementIndex = requirement.index;

    const valueToUpdate = requirement.value;
    if(find_value)
    {
      const updateResult = await collection.updateOne(
        {
          _id: documentId,
          'requirements.name': requirementName,
          'requirements.values.user_id': user_id,
        },
        {
          $set: { 'requirements.$[req].values.$[val].value': valueToUpdate },
        },
        {
          arrayFilters: [
            { 'req.name': requirementName },
            { 'val.user_id': user_id },
          ],
        }
      );
      console.log("Updated Existing Value")
    }
    else
    {
      const target_array = `requirements.${requirementIndex}.values`
      console.log(target_array)
      const retval = await collection.updateOne(
        {
          _id: documentId,
        },
        {
          $push: { [target_array]: { user_id: user_id, value: valueToUpdate } },
        }
      );
      console.log("Added New Value")
    }

    
    return {
      statusCode: 200
    }
  }
  catch (error)
  {
    console.log(error)
    return { statusCode: 500, body: error.toString() };
  }
}


module.exports = {handler}