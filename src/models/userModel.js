const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
