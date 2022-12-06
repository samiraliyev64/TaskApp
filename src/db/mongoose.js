const mongoose = require('mongoose');
const connectionURL = 'mongodb://localhost:27017/task';

mongoose.connect(connectionURL)

 const samir = new User({
   name: 'Samir',
   password: '1234567',
   age: 21,
   email: "samir123@gmail.com"
 });

 samir.save().then(user => console.log(user))

 taskBread = new Task({
   description: 'buy bread',
   done: true,
   drink: 'tea',
   count: 5,
   email: 'bread@MAil.ru    '
 })

 taskCola = new Task({
   description: 'buy cola',
   done: false
 })

 taskBread.save().then(task => console.log(task))
 taskCola.save().then(task => console.log(task))
