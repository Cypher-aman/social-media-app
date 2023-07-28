import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: [String],
  location: String,
  occupation: String,
});

const Users = mongoose.model("Users", userSchema);

export default Users;
