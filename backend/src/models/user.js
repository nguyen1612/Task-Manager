const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  email: {
    type: String,
    require: true,
    max: 255,
    unique: true
  },
  password: {
    type: String,
    require: true,
    max: 16
  },
},
{timestamps:true}
);


module.exports = mongoose.model("User", UserSchema);