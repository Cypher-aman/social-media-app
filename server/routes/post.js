import { Router } from "express";
import { getPosts, getUserPosts, likePost } from "../controllers/post.js";
import { userVerified } from "../middleware/auth.js";

const router = Router();

/* GET */
router.get("/", userVerified, getPosts);
router.get("/:id", userVerified, getUserPosts);

/* PATCH */
router.patch("/like/:userId/:postId", likePost);

export default router;
