const express = require('express');
const Task = require('../models/task');
const router = express.Router();

//task post
router.post('/tasks', (request, response) => {
  const task1 = new Task(request.body);
  task1.save()
    .then(task => response.status(201).send(task))
    .catch(error => response.status(400).send(error));
})

//task get
router.get('/tasks', async (req,res) => {
  try {
      const tasks = await Task.find({});
      res.status(200).send(tasks);
  } catch (e) {
      res.status(500).send();
  }
})

//task get by ID
router.get('/tasks/:id', async (req,res) => {
  const { id } = req.params;

  try{
    const task = await Task.findById(id);
    if(task){
      res.status(200).send(task)
    }
    else{
      res.status(404).send()
    }
  }
  catch(e){
      res.status(500).send();
  }
})

//task put
router.put('/tasks/:id', async (req,res) => {
  const validUpdates = ['done','description'];
  const keys = Object.keys(req.body);
  const isValid = keys.every(key => validUpdates.includes(key));
  if(!isValid){
    return res.status(400).send('can not change that');
  }
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators:true});
    if(task){
      res.status(200).send(task);
    }else{
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).send('error occured');
  }
})

//task delete
router.delete('/tasks/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if(deletedTask){
      res.status(200).send(deletedTask);
    }else{
      res.status(404).send();
    }

  } catch (e) {
    res.status(500).send();
  }

})

module.exports = router;
