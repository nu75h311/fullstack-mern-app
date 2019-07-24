import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo_description: {
    type: String,
    required: true,
  },
  todo_responsible: {
    type: String,
  },
  todo_priority: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
