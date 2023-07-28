import Users from "../models/Users.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    const friends = await Users.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await Users.findById(id);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }
    await user.save();

    const friends = await Users.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
