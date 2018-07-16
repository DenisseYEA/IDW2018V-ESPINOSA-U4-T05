const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true
},
password:{
    type: String,
    required: true
}
});

const userModel = mongoose.model('UserSchema', userSchema, 'user2');



module.exports = userModel;