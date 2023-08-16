import mongoose from 'mongoose';

export interface ImageInput {
    url: string;
    originalName: string;
}

export interface ImageDocument extends ImageInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ImageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        originalName: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const ImageModel = mongoose.model<ImageDocument>("Image", ImageSchema);

export default ImageModel;