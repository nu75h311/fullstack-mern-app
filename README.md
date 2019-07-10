# MERN study

## Requires

[Node.js](https://nodejs.org) with npm accessible from the PATH  
[MongoDB](https://docs.mongodb.com/manual/administration/install-community/) with mongo commands (`mongo`, `mongod`) accessible from the PATH

## Start whole application

To setup the MongoDB database for the first time, run (in order):

1. `npm run db:setup` : creates (if not existent) a MondoDB data folder inside the backend directory and starts the MongoDB server;
2. `mongo` (from another shell) : opens the MongoDB shell;
3. `use todos` (from the MongoDB shell) : creates (if not existent) the `todos` database.

Backend and client applications can be run separately from within the subdirectories.
To start them up altogether, run (in order) from the root:

1. `npm run db:server` (if the MongoDB server is not already running): starts the MongoDB server;
2. `npm install` (from another shell) : installs all node dependencies (including subdirectories);
3. `npm start` : will start up both the backend server and the React client.
