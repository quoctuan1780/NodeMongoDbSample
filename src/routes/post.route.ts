import { Express } from "express";
import { createPostHandler, findPostHandler, findPostByIdHandler, deletePostHandler, updatePostHandler } from "../controllers/post.controller";
import validateResource from '../middleware/validateResource';
import { createPostSchema } from '../schema/post.schema';

function posts(app: Express) {
   app.post("/post", [validateResource(createPostSchema)], createPostHandler);
   app.get("/post/:id", findPostByIdHandler);
   app.get("/post", findPostHandler);
   app.delete("/post/:id", deletePostHandler);
   app.put("/post", updatePostHandler);
}

export default posts;