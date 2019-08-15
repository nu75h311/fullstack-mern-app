import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  responsible: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  creatorId: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
