import mongoose from 'mongoose';

import Todo from './todo';

const connectDb = () => {

    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    const connection = mongoose.connection;

    return connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
};

const models = { Todo };

export { connectDb };

export default models;
