import Posts from "../models/Posts.js";
import Users from "../models/Users.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await Users.findById(userId);
    const post = new Posts({
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    await post.save();

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Posts.find({ userId: id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const post = await Posts.findById(postId);

    const isLiked = await post.likes.get(userId);

    if (!isLiked) {
      post.likes.set(userId, true);
    } else {
      post.likes.delete(userId);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
