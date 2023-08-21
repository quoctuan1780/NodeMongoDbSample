import { Request, Response } from "express";
import { createPost, deletePost, findPost, findPostById, updatePost } from "../services/post.service";
import { CreatePostInput, DeletePostInput, ReadPostInput, UpdatePostInput } from '../schema/post.schema'

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
    try {
        const result = await findPost();
        return res.status(200).json({result});
    } catch(e: any){
        return res.status(500).json({message: "Unknow error in the system"});
    }
}

export async function findPostByIdHandler(
    req: Request,
    res: Response
) {
    const id = req.params.id;
    try {
        const result = await findPostById({ _id: id }, { lean: true });
        return res.status(200).json({result});
    } catch(e: any){
        return res.status(404).json({message: `Cannot find the post with id ${id}`});
    }
}

export async function updatePostHandler(req: Request<{}, {}, UpdatePostInput["body"]>, res: Response){
    const query = {_id: req.body.id}
    const convertBody: CreatePostInput = req;

    try{
        const result = await updatePost(query, convertBody.body);

        return res.status(200).json({success: result});
    }catch(e: any){
        return res.status(500).json({message: e.message});
    }
}

export async function deletePostHandler(req: Request<DeletePostInput["params"]>, res: Response){
    const params = req.params;
    
    try{
        const result = await deletePost({_id: params.id}, { lean: true }, req);

        return res.status(204).json({success: result});
    }catch(e: any){
        return res.status(500).json({message: e.message});
    }
}