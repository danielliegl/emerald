# Emerald - A Web-based Guideline Checking Tool

## Introduction

## Features
- Account creation via Admin account
- Login
- Create Projects
- Assign Projects to users
- Fill out Criterions on Projects

## Requirements

- GitHub account, at [github.com](https://github.com/).
- MongoDB database host (v4 or higher), say at MongoDB Atlas
  [https://mongodb.com/atlas/](https://mongodb.com/atlas/).
- NodeJS web host (v16), for example [https://netlify.com/](https://netlify.com/).

## Deploying Emerald

### MongoDB
We used MongoDB Atlas for this example, feel free to use any other MongoDB host.

1. Create an account on on MongoBD Atlas and choose the M0 plan, which is sufficient for storing
Emerald’s data. Then in the Database tab create a new cluster for the application.
2. Use the free "Shared" cluster for this guide. At the time of writing, a new account comes with a
shared cluster already setup. To rename it, delete the cluster and create a new one, since it is not
possible to change the name. Create a database user for your database.
3. Go back to the database tab and open the cluster by clicking the name of the cluster.
4. Open the collections tab and choose "add my own data" to create a database and a first collection.
5. Two collections are needed to run Emerald: One for storing user data and one for storing the project
data. In this guide they will be called users and projects.
6. Go to the Network Access tab and open the "Add IP address" menu. Allow access from all IP
addresses from here. Go back to the overview and open the "Connect" menu. Go to drivers and
choose "Node.js" as the driver and the version "5.5 or later" and note down the connection string
below. Make sure to replace <password> with the password of the created database user

### Netlify

Sign in to Netlify using your GitHub account. Choose "Deploy with GitHub" and authorize Netlify to
access your GitHub account. Then choose your fork of the Emerald repository for deployment. Open the
deploy settings and change the following build settings:

- Runtime: Angular
- Base directory: `client/emerald-app/`
- Build command: `ng build –prod`
- Publish directory: `client/emerald-app/dist/`
- Functions directory: `client/emerald-app/netlify/functions`

Afterwards go to "Environment variables" and add the variables below using the collection
and database names, and database URI created the chapter before.

- `MONGODB_COLLECTION_SCRIPTS` = Projects collection name
- `MONGODB_COLLECTION_USERS` = Users collection name
- `MONGODB_DATABASE` = Database name
- `MONGODB_URI` = MongoDB database URI with <password> replaced with actual password
- `SECRET` = Freely select a secret (at least 32 characters is recommended )

## Backend API
Documentation for the backend can be found [here](doc/APIDocumentation.md).
