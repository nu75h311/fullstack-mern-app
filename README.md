## Requires

Node.js  
MongoDB  

## Start whole application

Backend and client applications can be run separately from withn the subdirectories.  

To start them up altogether, run the following commands (in order) from the root:  
1. `npm install` : will install all node dependencies (including subdirectories);  
2. `npm run setupdb` : will create (if not existent) a MondoDB data folder inside the backend directory, start the MongoDB server and create (if not existent) the `todos` database;  
3. `npm start` : will start up both the backend server and the React client.  