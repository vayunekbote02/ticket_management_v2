const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const UserData = mongoose.model("userdata", User);

module.exports = UserData;
