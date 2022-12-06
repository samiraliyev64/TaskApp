const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
const taskRouter = require('./router/task');
const userRouter = require('./router/user');

require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Your server runs on port:3000');
})
