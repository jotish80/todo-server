require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./taskModel');
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => console.log('Mongodb connected successfully'))
  .catch(err => console.log('Error => ', err));

app.use(cors());
app.use(express.json());

app.get('/:email', async (req, res) => {
  try {
    const tasks = await Task.find({ email: req.params.email });
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post('/:email', async (req, res) => {
  console.log(req.body);

  const { email } = req.params;
  const { task } = req.body;
  try {
    const todo = new Task({ task, email });
    await todo.save();
    res.send(todo);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);

    if (task.isCompleted) task.isCompleted = false;
    else task.isCompleted = true;

    await task.save();
    res.send(task);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    await task.save();
    res.send(task);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get('/completedTasks/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const tasks = await Task.find({ email });
    const completedTasks = tasks.filter(task => task.isCompleted == true);
    res.send(completedTasks);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running at port = ' + port);
});
