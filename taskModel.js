const mongoose = require('mongoose');

const schema = mongoose.Schema({
  task: {
    type: String,
    max: 50,
    min: 5,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', schema);
module.exports = Task;
