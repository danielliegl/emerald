## Script Object
Example:

```
{
  "_id": {
    "$oid": "65953e22645e0f0216baf95f" ##MongoDB ObjectId
  },
  "name": "Requirements List", ##Name of the Script
  "owner": {
    "$oid": "65953d29645e0f0216baf95c" ##Owner of the Script defined by ObjectId
  },
  "isPublic": true, ##When this is true, the script is public and can be processed by asigned users.
  "assignedUsers": [
    {
      "$oid": "65953fb2645e0f0216baf960"
    }
  ],
  "requirements": [ ##This Array is filled with Requirement Objects
    {
      "name": "Is very good.",
      "values": [ ##Save values for multiple users
        {
          "user": {
            "$oid": "65953fb2645e0f0216baf960"
          },
          "value": true ##Requirement value can either be bool or int
        }
      ],
      "isBoolean": true ##When false, this is treated as an int value
    }
  ]
}
```

## User Authentication
### Register User
Endpoint: `/.netlify/functions/register`

Method: POST

Parameters:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `username` | String | Username for new user (required) |
| `password` | String | Password for new user (required) |

## Manipulating Scripts

### Load Script
Endpoint: `/.netlify/functions/load_script`

Method: POST

Parameters:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `id` | MongoDB Object ID | ID of the Script to be loaded (required) |

Returns Script data as JSON on Success:
```
200 OK
{
	"_id": "65953e22645e0f0216baf95f",
	"name": "Requirements List",
	"owner": "65953d29645e0f0216baf95c",
	"isPublic": true,
	"assignedUsers": [
		"65953fb2645e0f0216baf960"
	],
	"requirements": [
		{
			"name": "Is very good.",
			"values": [
				{
					"user": "65953fb2645e0f0216baf960",
					"value": true
				}
			],
			"isBoolean": true
		}
	]
}
```

Return on not found:
```
404 Not Found
No Script with ID 65953e22645e0f0216ba295f found.
```


### Create Script
Endpoint: `/.netlify/functions/create_script`

Method: POST

Parameters:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `name` | String | Name for the new Script (required) |
| `owner` | MongoDB Object ID | ID of the user the owns the script (required) |

Returns on Success:
```
{
	"new_script": {
		"name": <name>,
		"isPublic": false,
		"owner": <owner user id>
		"assignedUsers": [],
		"requirements": [],
		"_id": "6599afcd319a788ac3468f7b"
	}
}
```

### Edit Script

Replaces an existing Script's data with new modified data.

Endpoint: `/.netlify/functions/edit_script`

Method: POST

Parameters:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `id` | MongoDB Object ID | ID of the script to be edited (required) |
| `script` | Object | Updated State of the script |

Returns on Success:
```
200 OK
{
	"new_script_data": {
		"name": "Edited",
		"owner": null,
		"isPublic": false,
		"assignedUsers": [],
		"requirements": []
	}
}
```
### Delete Script
Endpoint: `/.netlify/functions/delete_script`

Method: POST

Parameters:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `id` | MongoDB Object ID | ID of the script to be deleted (required) |

Returns on Success:
```
200 OK
Deleted script 659a7ad52791cf93925d77dc successfully.
```

Return when Bad ID is given:
```
400 Bad Request
No script found with given ID.
```