import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Response } from "express";
import PostModel, { PostDocument, PostInput } from "../models/post.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import logger from "../utils/logger";

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
    options: QueryOptions = { lean: true },
    res: Response
) {
    const metricsLabels = {
        operation: "findPostById",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: "true" });
        return res.status(200).json({result});
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return res.status(404).json({message: `Cannot find the post with id ${query._id}`});
    }
}

export async function findPost(res: Response){
    const metricsLabels = {
        operation: "findPost",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PostModel.find();
        timer({ ...metricsLabels, success: "true" });
        return res.status(200).json({result});
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return res.status(500).json({message: "Unknow error in the system"});
    }
}