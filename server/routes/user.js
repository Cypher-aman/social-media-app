import { Router } from "express";
import { userVerified } from "../middleware/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";

const router = Router();

/* GET */
router.get("/:id", userVerified, getUser);
router.get("/friends/:id", userVerified, getUserFriends);

/* PATCH */
router.patch("/:id/:friendId", userVerified, addRemoveFriend);

export default router;
