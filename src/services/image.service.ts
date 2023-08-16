import { Response } from 'express';
import ImageModel, { ImageInput } from '../models/image.model';
import { databaseResponseTimeHistogram } from "../utils/metrics";
import logger from "../utils/logger";

const timer = databaseResponseTimeHistogram.startTimer();

const createImage = async (input: ImageInput, res: Response) => {
    const metricsLabels = {
        operation: "createImage",
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await ImageModel.create(input);
        timer({ ...metricsLabels, success: "true" });
        return res.status(201).json({result});
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return res.status(500).json({message: e.message});
    }
}

const deleteImage = async (res: Response, urls: any[]) => {
    const metricsLabels = {
        operation: "DeleteImage",
    };

    try {
        const result = await ImageModel.deleteMany({url: urls})
        timer({ ...metricsLabels, success: "true" });
        return res.status(204).json({ result });
    }
    catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return res.status(500).json({message: e.message});
    }
}

export { createImage as CreateImage, deleteImage as DeleteImage} 