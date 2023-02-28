const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", adminSchema);

module.exports = User;
