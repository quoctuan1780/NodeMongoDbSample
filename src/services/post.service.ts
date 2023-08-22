import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Response, Request } from "express";
import PostModel, { PostDocument, PostInput } from "../models/post.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import logger from "../utils/logger";
import { deleteImage, extractImgSrc } from '../utils/helper';
import { DeleteImage } from './image.service'

export async function createPost(input: PostInput, res: Response) {
    const metricsLabels = {
        operation: "createPost",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.create(input);
        timer({ ...metricsLabels, success: "true" });
        return res.status(201).json({result});
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return res.status(500).json({message: "An error has occured when create the post"});
    }
}

export async function findPostById(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: "findPostById",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: "true" });
        return result
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return;
    }
}

export async function findPost(){
    const metricsLabels = {
        operation: "findPost",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.find();
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return;
    }
}

export async function updatePost(
    query: FilterQuery<PostDocument>,
    input: PostInput,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: "findPostById",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.updateOne(query, input, options);
        timer({ ...metricsLabels, success: "true" });
        return result
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return;
    }
}

export async function deletePost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = { lean: true },
    req: Request){
    const metricsLabels = {
        operation: "deletePost",
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const post = await PostModel.findOne(query, {}, options);

        if(!post){
            timer({ ...metricsLabels, success: "true" });
            return true;    
        }

        const images: any[] = [];

        images.push(...extractImgSrc(post.subTitle));
        images.push(...extractImgSrc(post.content));
        images.push(post.imageUrl);

        const host = req.get('host') as String;
        const protocol = req.protocol;

        deleteImage(host, protocol, images);

        await DeleteImage(images);
        await PostModel.deleteOne(query);

        timer({ ...metricsLabels, success: "true" });

        return true;
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return false;
    }
}