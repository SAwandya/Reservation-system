const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  cardnumber: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    gender: Joi.string().min(3).max(50).required(),
    dateofbirth: Joi.date().required(),
    cardnumber: Joi.string().required(),
  });

  var result = schema.validate(user);

  return result;
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
