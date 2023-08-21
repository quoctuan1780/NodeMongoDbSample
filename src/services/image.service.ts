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
        return result;
    } catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return;
    }
}

const deleteImage = async (urls: any[]) => {
    const metricsLabels = {
        operation: "DeleteImage",
    };

    try {
        const result = await ImageModel.deleteMany({url: urls})
        timer({ ...metricsLabels, success: "true" });
        return result;
    }
    catch (e: any) {
        timer({ ...metricsLabels, success: "false" });
        logger.error(`error: ${e.message}`);
        return;
    }
}

export { createImage as CreateImage, deleteImage as DeleteImage} 