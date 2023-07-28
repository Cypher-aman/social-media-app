import jwt from "jsonwebtoken";

export const userVerified = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(403).json({ message: "User Unauthorized" });

    if (token.startsWith("Bearer ")) {
      token = token.split("Bearer ")[1];
    }

    const verified = jwt.verify(token, process.env.JWT_KEY);

    if (!verified) return res.json(403).json({ message: "User Unauthorized" });

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
