const express = require('express');
const User = require('../models/user');
const router = express.Router();

//users post
router.post('/users', (req,res) => {
  const user = new User(req.body);
  user.save().then(user => {
    res.send(user);
  }).catch(err => res.send(err))
})

//users get
router.get('/users', async (req,res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
      res.status(500).send();
  }
})

//users get by ID
router.get('/users/:id', async (req,res) => {
  const {id} = req.params;
  try {
        const user = await User.findById(id);
        if(user){
            res.status(200).send(user)
        }else{
          res.status(404).send()
        }
  }
  catch (e) {
        res.status(500).send()
  }
})

//users put
router.put('/users/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators:true});
    if(user){
      res.status(200).send(user);
    }
    else{
      res.status(404).send('there is not such user');
    }
  } catch (e) {
    res.status(500).send('some server problems');
  }

})

//users delete
router.delete('/users/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if(deletedUser){
      res.status(200).send(deletedUser);
    }
    else{
      res.status(404).send('there is not such user');
    }
  } catch (e) {
      res.status(500).send('some server problems');
  }
})

module.exports = router;
