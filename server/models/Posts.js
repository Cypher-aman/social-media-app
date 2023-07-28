import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  description: String,
  location: String,
  picturePath: String,
  userPicturePath: String,
  comments: [String],
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
