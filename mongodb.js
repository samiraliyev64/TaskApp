const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const dbName = 'task-app';

MongoClient.connect(connectionURL, {useNewUrlParser: true} , (error, client) => {
  if(error){
    return console.log('Connection error occured');
  }

  const db = client.db(dbName);
  db.collection('users').insertOne({
    name: 'Samir',
    surname: 'Aliyev',
    age: 20
  })

   db.collection('users').insertMany([
    {
      name: 'Ferrux',
      surname: 'Aliyev',
      age:19
    },
    {
      name: 'Emil',
      surname: 'Hacizade',
      age:20
    }
  ])
  db.collection('admins').insertOne({
    name: 'Admin Samir',
    isAdmin: true
  })

  db.collection('tasks').insertMany([
    {
      desc: 'learn node js',
      done: false
    },
    {
      desc: 'learn mongodb',
      done:true
    }
  ], (err,result) => {
    if(err){
      return console.log('error happened');
    }
  })

  //find
  db.collection('users').find({age:20}).toArray((err, users) => {
    if(err){
      return console.log('error happened');
    }
    console.log(users);
  });
  db.collection('users').find({age:20}).count((err, count) => {
    if(err){
      return console.log('error happened');
    }
    console.log(count);
  });


  db.collection('tasks').insertMany([
    {
      desc: 'learn react',
      done: true
    },{
      desc: 'learn php',
      done: false
    },{
      desc: 'learn python',
      done: true
    },{
      desc: 'learn c#',
      done: true
    },{
      desc: 'learn assembly',
      done: false
    }
  ], (err,res) => {
    if(err){
      console.log('error happened');
    }
  })

  db.collection('tasks').find({done:true}).toArray((err,tasks)=>{
    if(err){
      console.log('error happened');
    }
    console.log(tasks);
  })
  db.collection('tasks').find({done:true}).count((err,count) =>{
    if(err){
      console.log('error happened');
    }
    console.log(count);
  })


  //update
  const updatePromise = db.collection('users').updateOne({
    _id: new ObjectID('6330d57bbc58667c1272d85b')
  }, {$inc:{
    age:4
    }}
  )
  updatePromise.then(res => console.log(res))
               .catch(err => console.log(err));

  db.collection('users').deleteOne({
    _id: new ObjectID('6331d8d895444fd2cef57a44')
  }).then(res => console.log(res))
    .catch(err => console.log(err))

})
