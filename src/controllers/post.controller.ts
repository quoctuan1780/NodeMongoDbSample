import { Request, Response } from "express";
import { createPost, findPost, findPostById } from "../services/post.service";
import { CreatePostInput } from '../schema/post.schema'

export async function createPostHandler(
    req: Request<{}, {}, CreatePostInput["body"]>,
    res: Response
) {
    const body = req.body;

    return await createPost({ ...body }, res);
}

export async function findPostHandler(
    req: Request,
    res: Response
) {
    const posts = await findPost(res);

    return posts;
}

export async function findPostByIdHandler(
    req: Request,
    res: Response
) {
    const id = req.params.id;

    const post = await findPostById({ _id: id }, { lean: true }, res);

    return post;
}