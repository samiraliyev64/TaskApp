const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String
  },
  password: {
    type: String,
    required:true,
    minlength: 6
  },
  age: {
    type: Number,
    validate(value){
      if(value < 0){
        throw new Error('age can not be under 0');
      }
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('it is not valid email');
      }
    }
  }
})


module.exports = User;
