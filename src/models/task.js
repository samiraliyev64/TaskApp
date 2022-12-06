const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    minlenght:6,
    required:true
  },
  done: {
    type: Boolean
  },
  count:{
    type: Number,
    validate(value) {
      if(value < 0){
        throw new Error('count can not be under 0')
      }
      else if(value > 10){
        throw new Error('max count is 10 :)')
      }
    }
  },
  drink:{
    type: String,
    required: false,
    default: 'cola',
    enum: ['cola','tea']
  },
  email:{
    type: String,
    trim: true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('not valid email');
      }
    }
  }
})


module.exports = Task;
