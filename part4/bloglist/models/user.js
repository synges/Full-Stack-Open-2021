const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String },
  passwordHash: { type: Number, require: true },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Blog', userSchema);
