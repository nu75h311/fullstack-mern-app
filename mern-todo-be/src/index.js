import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/todos', routes.todo);


// Database

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

//Start

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NAME} mode`);
});