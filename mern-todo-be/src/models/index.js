import mongoose from 'mongoose';

import User from './userModel';
import Todo from './todoModel';

const connectDb = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  const { connection } = mongoose;

  return connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};

const disconnectDb = async () => {
  await mongoose.connection.close();
  console.log('MongoDB database diconnected');
};

const models = { User, Todo };

export { connectDb, disconnectDb };

export default models;
