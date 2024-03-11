import express from 'express';
import { createPost, getPosts } from '../controllers/post.controller.js';
import {verifyToken} from '../utils/verifyUser.js'

const postRouter = express.Router();

postRouter.post("/createPost",  createPost);
postRouter.get("/getPosts", verifyToken, getPosts)

export default postRouter;