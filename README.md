# Emerald - A Web-based Guideline Checking Tool

## Introduction

## Planned Features

- Registration and Login
- Create, edit and delete Guideline Checklist (Scripts)
- Assign Scripts to users
- Import/Export Scripts and Study Results

## Requirements

- GitHub account, at [github.com](https://github.com/).

- MongoDB database host (v4 or higher), say at MongoDB Atlas
  [https://mongodb.com/atlas/](https://mongodb.com/atlas/).

- NodeJS web host (v16), for example [https://netlify.com/](https://netlify.com/).

## Deploying Emerald

### MongoDB

We used MongoDB Atlas for this example, feel free to use any other MongoDB host.

1. Create an account on [MongoDB Atlas](https://mongodb.com/atlas/)
2. Create a new Deployment.
3. Create a new Database within the Deployment.
4. Create 3 different Collections within the Deployment. You can name these as
   you like. For this guide we will call them:
  - `Users`
  - `Scripts`
  - `Sessions`
5. TODO: describe allowing connection from netlify


### Netlify

- Add these Values to the Environment Variables in your deployment:
  - `MONGODB_URI`: Your MongoDB URI to access your Database.
  - `MONGODB_DATABASE`: The name of your MongoDB Database
  - `MONGODB_COLLECTION_SCRIPTS`: Name of the Collection which stores the
    Scripts.
  - `MONGODB_COLLECTION_USERS`: Name of Collection which stores the Users.
  - `MONGODB_COLLECTION_SESSIONS`: Name of Collection which stores the Sessions.
  - `SECRET`: The Secret used for the User sessions.


## Backend API
Documentation for the backend can be found [here](doc/APIDocumentation.md).