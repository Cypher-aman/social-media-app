import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = new Users(data);
    user.password = passwordHash;
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) return res.status(401).json({ error: "User does not exists!" });

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect)
      return res.status(401).json({ error: "Incorrect Password!" });

    const token = jwt.sign({ email }, process.env.JWT_KEY);

    res.status(200).json({ token, user });
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
};
